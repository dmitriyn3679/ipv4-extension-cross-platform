# Proxy-IPv4 Firefox Extension

This Firefox extension manages IP addresses purchased on the Proxy-IPv4 service.

## Build Instructions

### Prerequisites

- Node.js (version 16.x)
- npm (version 7.x or higher)

### Installation

1. Download file
2. cd ipv4-extension-cross-platform
3. Build
    - Linux / Mac build => npm run build:firefox,
    - Windows build => INLINE_RUNTIME_CHUNK=false npm run build:firefox
4. Use manifest.json from build folder.
