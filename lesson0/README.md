# Docker Installation, Linux Setup, and VSCode Installation on Windows

This guide will walk you through the process of installing Docker on a Windows operating system, setting up a Linux distribution using Windows Subsystem for Linux (WSL) 2, and installing Visual Studio Code (VSCode) for development.

## Installing Docker on Windows

### Prerequisites:
- 64-bit version of Windows 10 Pro or Enterprise.
- Virtualization enabled in the BIOS settings.

### Steps:

1. **Download Docker Desktop:**
   - Visit the official Docker website: [Docker Desktop](https://www.docker.com/products/docker-desktop)
   - Click on "Get Docker" and download the stable version.

2. **Install Docker Desktop:**
   - Run the installer you downloaded.
   - Follow the on-screen instructions to install Docker Desktop.
   - During installation, select the option to use Windows containers if prompted.

3. **Launch Docker Desktop:**
   - Once the installation is complete, launch Docker Desktop.
   - Docker will start running in the background, and you'll see the Docker icon in the system tray.

4. **Verify Installation:**
   - Open a command prompt or PowerShell window.
   - Type the following command to verify that Docker is installed and running:
     ```bash
     docker --version
     docker run hello-world
     ```

## Setting up a Linux Distribution on Windows using WSL 2

### Prerequisites:
- Virtual Machine Platform enabled in Windows Features.
- Windows Subsystem for Linux (WSL) and Virtual Machine Platform enabled in Windows Features settings.

### Steps:

1. **Install WSL 2:**
   - Open PowerShell as an Administrator and run the following commands:
     ```powershell
     dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
     dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
     ```

2. **Download and Install Linux Kernel Update Package:**
   - Download the WSL 2 Linux kernel update package from [Microsoft WSL 2 Kernel Update Package](https://aka.ms/wsl2kernel).
   - Install the update package.

3. **Set WSL Version to 2:**
   - Open PowerShell and run the following command:
     ```powershell
     wsl --set-default-version 2
     ```

4. **Install a Linux Distribution from Microsoft Store:**
   - Open Microsoft Store and search for your preferred Linux distribution (e.g., Ubuntu, Debian). 
   - We recommend Ubnutu22.04
   - Click "Install" to download and install the distribution.

5. **Set Up and Configure Linux Distribution:**
   - Launch the installed Linux distribution from the Start menu.
   - Follow the on-screen instructions to set up a user account and password.

6. **Verify WSL Installation:**
   - Open PowerShell and run the following command to check the installed WSL distributions:
     ```powershell
     wsl --list --verbose
     ```

## Installing Visual Studio Code (VSCode)

### Steps:

1. **Download VSCode:**
   - Visit the official Visual Studio Code website: [Visual Studio Code](https://code.visualstudio.com/)
   - Click on "Download" and download the stable version.

2. **Install VSCode:**
   - Run the installer you downloaded.
   - Follow the on-screen instructions to install Visual Studio Code.

3. **Open VSCode:**
   - Once the installation is complete, launch Visual Studio Code.
   - You can now start coding and use VSCode for your development tasks.

Now you have Docker installed on your Windows system, set up a Linux distribution using Windows Subsystem for Linux (WSL) 2, and installed Visual Studio Code for your development needs. Feel free to customize this README according to your specific needs and preferences.


# Docker Installation, Linux-like Environment Setup, and VSCode Installation on macOS

This guide will walk you through the process of installing Docker on a macOS system, setting up a Linux-like environment using Windows Subsystem for Linux (WSL) 2, and installing Visual Studio Code (VSCode) for development.

## Installing Docker on macOS

### Prerequisites:
- macOS system with a 64-bit processor.

### Steps:

1. **Download Docker Desktop for Mac:**
   - Visit the official Docker website: [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop)
   - Click on "Download for Mac" and download the stable version.

2. **Install Docker Desktop:**
   - Run the installer you downloaded.
   - Follow the on-screen instructions to install Docker Desktop.

3. **Launch Docker Desktop:**
   - Once the installation is complete, launch Docker Desktop.
   - Docker will start running in the background, and you'll see the Docker icon in the menu bar.

4. **Verify Installation:**
   - Open a terminal window.
   - Type the following command to verify that Docker is installed and running:
     ```bash
     docker --version
     docker run hello-world
     ```

## Installing Visual Studio Code (VSCode) on macOS

### Steps:

1. **Download VSCode for macOS:**
   - Visit the official Visual Studio Code website: [Visual Studio Code](https://code.visualstudio.com/)
   - Click on "Download" and download the macOS version.

2. **Install VSCode:**
   - Run the installer you downloaded.
   - Follow the on-screen instructions to install Visual Studio Code.

3. **Open VSCode:**
   - Once the installation is complete, launch Visual Studio Code.
   - You can now start coding and use VSCode for your development tasks.

Now you have Docker installed on your macOS system. For macOS users, setting up a Linux-like environment is not required, as macOS itself is Unix-based. Additionally, you've installed Visual Studio Code for your development needs. Feel free to customize this README according to your specific needs and preferences.
