# Raytracer Node.js

A real-time raytracing engine built with Node.js, Express, and Socket.IO. This project implements a basic raytracer that can render 3D scenes in real-time through a web interface.

## Features

- Real-time raytracing through web interface
- Support for basic 3D primitives
- Lighting and shading capabilities
- WebSocket-based rendering progress updates
- PNG image output

## Project Structure

- `core/` - Core raytracing engine components
  - `shader/` - Shading and material implementations
  - `common/` - Common utilities and math functions
  - `image/` - Image processing and output
  - `light/` - Lighting implementations
  - `primitive/` - 3D primitive objects
  - `renderer/` - Main rendering engine
- `public/` - Static web assets
- `main.js` - Express server and WebSocket setup

## Dependencies

- Express 3.1.0
- Socket.IO 0.9.13
- pngjs 0.4.0-alpha

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node main.js
   ```
4. Open your browser to `http://localhost:8080`

## Usage

1. Access the web interface at `http://localhost:8080`
2. Configure your scene parameters
3. Click render to start the raytracing process
4. View the real-time rendering progress
5. Save the final rendered image

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.