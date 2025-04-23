## 📋 <a name="table">Table of Contents</a>

1. 🔗 [Contact](#contact)
2. 🤖 [Introduction](#introduction)
3. ⚙️ [Tech Stack](#tech-stack)
4. 🔋 [Features](#features)
5. 🚀 [Getting Started](#getting-started)
6. 🧪 [Core Features](#core-features)
7. 🔐 [Authentication](#authentication)
8. 📊 [Dashboard & Analytics](#dashboard)
9. 🤝 [Contributing](#contributing)

## 🔗 Contact

- 📺 **YouTube**: [Watch the demo](https://youtu.be/I6-UZobx858)
- 💬 **Discord**: `nemsj`


## <a name="introduction">🤖 Introduction</a>

**Molecule-Forge** is a cutting-edge molecular design and drug discovery platform that leverages NVIDIA's AI models to generate and analyze molecular structures. This tool helps researchers and scientists accelerate drug discovery by providing an intuitive interface for molecular generation, visualization, and analysis.

### Why Choose Molecule-Forge?

- **AI-Powered Molecular Generation**: Generate novel molecular structures using NVIDIA's advanced AI models
- **Interactive Visualization**: View and manipulate 3D molecular structures in real-time
- **Collaborative Research**: Share and collaborate on molecular designs with team members
- **History Tracking**: Keep track of all generated molecules and their properties
- **User-Friendly Interface**: Intuitive dashboard and controls for seamless workflow

## <a name="tech-stack">⚙️ Tech Stack</a>

- **Frontend**:
  - Next.js 14
  - TypeScript
  - Tailwind CSS
  - DaisyUI
  - React Chart.js
  - Framer Motion

- **Backend**:
  - NextAuth.js for authentication
  - MongoDB for data storage
  - NVIDIA API for molecular generation
  - Ably for real-time features

- **Development Tools**:
  - ESLint
  - Prettier
  - TypeScript
  - Prisma

## <a name="features">🔋 Features</a>

- **Molecular Generation**:
  - Generate molecules from SMILES strings
  - Customize generation parameters (similarity, particles, iterations)
  - Real-time 3D visualization
  - Save and manage generated molecules

- **User Management**:
  - Secure authentication
  - User profiles
  - Research group collaboration
  - Activity history

- **Dashboard**:
  - Analytics and statistics
  - Molecule bank management
  - Research progress tracking
  - Team collaboration tools

## <a name="getting-started">🚀 Getting Started</a>

### Prerequisites

- Node.js
- npm
- MongoDB database
- NVIDIA API key
- Ably API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/molecule-forge
cd molecule-forge
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
MONGODB_URL='your-mongodb-url'
RESEND_KEY='your-resend-key'
NEXT_PUBLIC_API_BASE_URL='http://localhost:3000'
NEXTAUTH_SECRET='your-nextauth-secret'
NVIDIA_API_KEY='your-nvidia-api-key'  https://build.nvidia.com/nvidia/molmim-generate
NEXT_PUBLIC_ABLY_API_KEY='your-ably-api-key'
```
You can access the [molmin-api](https://build.nvidia.com/nvidia/molmim-generate) here.


4. Start the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to access the application.

## <a name="core-features">🧪 Core Features</a>

### Molecular Generation

The platform allows users to:
- Input SMILES strings for molecular generation
- Set parameters for generation (number of molecules, similarity threshold)
- View generated molecules in 3D
- Save and manage generated molecules
- Track generation history

### Research Collaboration

- Create research groups
- Share molecules with team members
- Track collaborative progress
- Manage research projects

## <a name="authentication">🔐 Authentication</a>

The platform uses NextAuth.js for secure authentication:
- Email/password login
- Password reset functionality
- Session management
- Protected routes and API endpoints

## <a name="dashboard">📊 Dashboard & Analytics</a>

The dashboard provides:
- Overview of generated molecules
- Generation statistics
- Team activity
- Research progress tracking
- Molecule bank management

## <a name="contributing">🤝 Contributing</a>

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

