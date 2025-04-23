"use client";
import React, { useState } from "react";
import Modal from "@/app/ui/modals/Modal";
import { useSession } from "next-auth/react";
import { createMoleculeGenerationHistory } from "@/lib/actions/molecule-generation.actions";
import { LoaderCircle } from "lucide-react";
import type { Session } from "next-auth";

interface ComponentHeaderProps {
  pageName: string;
  containActionButton?: boolean;
}

const ComponentHeader: React.FC<ComponentHeaderProps> = ({
  pageName,
  containActionButton,
}) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    smiles: "",
    numMolecules: "",
    minSimilarity: "",
    particles: "",
    iterations: "100", // Default value
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const openModal = (modalId: string) => {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  const closeModal = () => {
    const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.smiles.trim()) {
      newErrors.smiles = "SMILES string is required";
    }
    
    if (!formData.numMolecules) {
      newErrors.numMolecules = "Number of molecules is required";
    } else if (isNaN(Number(formData.numMolecules)) || Number(formData.numMolecules) <= 0) {
      newErrors.numMolecules = "Must be a positive number";
    }
    
    if (!formData.minSimilarity) {
      newErrors.minSimilarity = "Minimum similarity is required";
    } else if (isNaN(Number(formData.minSimilarity)) || Number(formData.minSimilarity) < 0 || Number(formData.minSimilarity) > 1) {
      newErrors.minSimilarity = "Must be a number between 0 and 1";
    }
    
    if (!formData.particles) {
      newErrors.particles = "Number of particles is required";
    } else if (isNaN(Number(formData.particles)) || Number(formData.particles) <= 0) {
      newErrors.particles = "Must be a positive number";
    }
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsLoading(false);
      return;
    }

    try {
      if (!session?.user?.id) {
        throw new Error("You must be logged in to add molecules");
      }

      const payload = {
        ...formData,
        numMolecules: Number(formData.numMolecules),
        minSimilarity: Number(formData.minSimilarity),
        particles: Number(formData.particles),
        iterations: Number(formData.iterations),
        generatedMolecules: [], // Will be populated by the AI
      };

      await createMoleculeGenerationHistory(payload, session.user.id);
      closeModal();
      // Optionally refresh the page or update the molecule list
      window.location.reload();
    } catch (error: any) {
      console.error("Error adding molecule:", error);
      setErrors({ submit: error.message || "Failed to add molecule" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h2>


      {/* {containActionButton && (
        <nav>
          <ol className="flex items-center gap-2">
            <li
              onClick={() => openModal("my_modal_1")}
              className="cursor-pointer rounded-lg bg-primary px-4 py-2 text-center font-medium text-white"
            >
            </li>
          </ol>
        </nav>
      )} */}

      <Modal
        id="my_modal_1"
        title="Add New Molecule"
        content={
          <>
            <form onSubmit={handleSubmit}>
              <div className="p-1">
                {errors.submit && (
                  <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-500 dark:bg-red-100/10 dark:text-red-400">
                    {errors.submit}
                  </div>
                )}

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      SMILES String <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="smiles"
                      value={formData.smiles}
                      onChange={handleInputChange}
                      placeholder="Enter SMILES string"
                      className={`w-full rounded-lg border-[1.5px] ${
                        errors.smiles ? "border-red-500" : "border-stroke"
                      } bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-gray-2 dark:bg-[#181818] dark:text-white dark:focus:border-primary`}
                    />
                    {errors.smiles && (
                      <p className="mt-1 text-sm text-red-500">{errors.smiles}</p>
                    )}
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Number of Molecules <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="numMolecules"
                      value={formData.numMolecules}
                      onChange={handleInputChange}
                      placeholder="Enter number of molecules"
                      min="1"
                      className={`w-full rounded-lg border-[1.5px] ${
                        errors.numMolecules ? "border-red-500" : "border-stroke"
                      } bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-gray-2 dark:bg-[#181818] dark:text-white dark:focus:border-primary`}
                    />
                    {errors.numMolecules && (
                      <p className="mt-1 text-sm text-red-500">{errors.numMolecules}</p>
                    )}
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Minimum Similarity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="minSimilarity"
                    value={formData.minSimilarity}
                    onChange={handleInputChange}
                    placeholder="Enter minimum similarity (0-1)"
                    step="0.1"
                    min="0"
                    max="1"
                    className={`w-full rounded-lg border-[1.5px] ${
                      errors.minSimilarity ? "border-red-500" : "border-stroke"
                    } bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-gray-2 dark:bg-[#181818] dark:text-white dark:focus:border-primary`}
                  />
                  {errors.minSimilarity && (
                    <p className="mt-1 text-sm text-red-500">{errors.minSimilarity}</p>
                  )}
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Particles <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="particles"
                    value={formData.particles}
                    onChange={handleInputChange}
                    placeholder="Enter number of particles"
                    min="1"
                    className={`w-full rounded-lg border-[1.5px] ${
                      errors.particles ? "border-red-500" : "border-stroke"
                    } bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-gray-2 dark:bg-[#181818] dark:text-white dark:focus:border-primary`}
                  />
                  {errors.particles && (
                    <p className="mt-1 text-sm text-red-500">{errors.particles}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full justify-center rounded-lg bg-primary p-3 font-medium text-white hover:bg-opacity-90 disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                      Adding...
                    </span>
                  ) : (
                    "Add molecule"
                  )}
                </button>
              </div>
            </form>
          </>
        }
        onCloseText="Close"
      />
    </div>
  );
};

export default ComponentHeader;