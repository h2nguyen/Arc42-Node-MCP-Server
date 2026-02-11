# Testing arc42 MCP Server with MCP Inspector

This guide explains how to test the arc42 MCP Server using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), a web-based tool for debugging and testing MCP servers.

## Prerequisites

Before testing with MCP Inspector, ensure you have:

1. **Node.js 22+** installed (tested with Node.js 22 and 24)
2. **Built the project** locally

```bash
# Clone the repository (if not already done)
git clone --recurse-submodules https://github.com/h2nguyen/Arc42-Node-MCP-Server.git
cd Arc42-Node-MCP-Server

# Install dependencies
npm install

# Build the project
npm run build
```

## Understanding Workspace Paths

The arc42 MCP server needs to know **where to create documentation files**. There are two mechanisms:

### 1. Default Workspace Path (Startup Argument)

When starting the server, you can provide a path where documentation will be created by default:

```bash
node dist/index.js /path/to/my-project
```

The server creates an `arc42-docs/` folder inside this path:
- `/path/to/my-project/arc42-docs/`

**In the examples below**, we use `./test-project` or `/project` as the default workspace path for testing purposes. This is just a test directory - in real usage, you would point to your actual project.

### 2. Dynamic `targetFolder` Parameter (Per-Tool Override)

Each tool call can include an optional `targetFolder` parameter to override the default:

```json
{
  "projectName": "My Project",
  "targetFolder": "/Users/me/real-project"
}
```

This allows you to:
- Test with one workspace but write to another
- Work with multiple projects without restarting the server
- Let AI agents dynamically choose where to write

**If neither is provided**, the server uses the current working directory.

---

## Option 1: Using npx (Recommended for Quick Testing)

The fastest way to test the arc42 MCP server:

### Step 1: Start MCP Inspector

```bash
# Create test directory first
mkdir -p test-project

# Start MCP Inspector with the arc42 server integrated
# The "./test-project" is the default workspace path for testing
npx @modelcontextprotocol/inspector node dist/index.js ./test-project
```

This command starts **both** the proxy server (port 6277) and the UI (port 6274) together.

### Step 2: Open the Inspector

The browser should open automatically. If not, open the URL shown in the terminal output:

```
http://localhost:6274/?MCP_PROXY_AUTH_TOKEN=<your-session-token>
```

> **Important**: Use the full URL with the auth token shown in the terminal. The token is required for authentication.

The inspector will automatically connect to the arc42 MCP server, and you'll see the six tools available.

## Option 2: Using Docker Compose

Docker Compose runs MCP Inspector inside a container. This method requires **manual configuration** of the server connection in the Inspector UI.

### Step 1: Create a Test Directory

```bash
mkdir -p test-project
```

### Step 2: Build the Project

```bash
npm run build
```

### Step 3: Start the Inspector

```bash
docker compose up mcp-inspector
```

### Step 4: Open the Inspector and Configure Connection

Open your browser at **http://localhost:6274**

> **Note**: No authentication token is needed when using Docker Compose, as the `DANGEROUSLY_OMIT_AUTH=true` environment variable is set.

**Important**: The server does **not** auto-connect when using Docker Compose. You must manually configure the connection using **container paths**:

| Field              | Value                         |
|--------------------|-------------------------------|
| **Transport Type** | `STDIO`                       |
| **Command**        | `node`                        |
| **Arguments**      | `/app/dist/index.js /project` |

Click **Connect** to start the server.

> ⚠️ Do NOT use your local machine paths like `/Users/yourname/...` - these don't exist inside the Docker container. The paths `/app/dist/index.js` and `/project` are mounted inside the container.

Once connected, you'll see the six arc42 tools available in the "Tools" tab.

## Option 3: Manual Configuration in MCP Inspector UI

If you're running MCP Inspector standalone and need to manually configure it:

### Step 1: Install and Start MCP Inspector

```bash
npx @modelcontextprotocol/inspector
```

### Step 2: Configure the Connection

In the MCP Inspector UI (http://localhost:6274):

| Field              | Value                                                                          |
|--------------------|--------------------------------------------------------------------------------|
| **Transport Type** | `STDIO`                                                                        |
| **Command**        | `node`                                                                         |
| **Arguments**      | `/full/path/to/Arc42-Node-MCP-Server/dist/index.js /full/path/to/test-project` |

> **Important**: Use absolute paths for both the `dist/index.js` file and the test project directory.

**Example for macOS/Linux:**
- Command: `node`
- Arguments: `/Users/yourname/projects/Arc42-Node-MCP-Server/dist/index.js /Users/yourname/projects/test-project`

**Example for Windows:**
- Command: `node`
- Arguments: `C:\projects\Arc42-Node-MCP-Server\dist\index.js C:\projects\test-project`

### Step 3: Connect

Click the **Connect** button. The status should change from "Disconnected" to "Connected".

## Testing the Tools

Once connected, you'll see the arc42 MCP Server tools in the Inspector. Here's how to test each one:

### 1. arc42-workflow-guide

**Purpose**: Get the complete arc42 workflow guide

**Parameters**: None

**Test**:
1. Click on `arc42-workflow-guide` in the tools list
2. Click "Run Tool"
3. Verify you receive a comprehensive guide with all 12 sections

### 2. arc42-init

**Purpose**: Initialize arc42 documentation structure

**Parameters**:
```json
{
  "projectName": "My Test Project"
}
```

**Test**:
1. Click on `arc42-init`
2. Enter the parameters above
3. Click "Run Tool"
4. Verify success response
5. Check that `test-project/arc42-docs/` directory was created with all section files

**Optional**: Test with `force: true` to re-initialize:
```json
{
  "projectName": "My Test Project",
  "force": true
}
```

**Optional**: Test with `targetFolder` to initialize in a specific directory:
```json
{
  "projectName": "My Test Project",
  "targetFolder": "/path/to/custom/project"
}
```

### 3. arc42-status

**Purpose**: Check documentation completion status

**Parameters**: None (or specify targetFolder)

**Test**:
1. Run `arc42-init` first (if not already done)
2. Click on `arc42-status`
3. Click "Run Tool"
4. Verify you see completion percentage and section status

**Optional**: Test with `targetFolder` to check status in a specific directory:
```json
{
  "targetFolder": "/path/to/custom/project"
}
```

### 4. generate-template

**Purpose**: Generate template content for a specific section

**Parameters**:
```json
{
  "section": "01_introduction_and_goals"
}
```

**Test each section**:
- `01_introduction_and_goals`
- `02_architecture_constraints`
- `03_context_and_scope`
- `04_solution_strategy`
- `05_building_block_view`
- `06_runtime_view`
- `07_deployment_view`
- `08_concepts`
- `09_architecture_decisions`
- `10_quality_requirements`
- `11_technical_risks`
- `12_glossary`

### 5. update-section

**Purpose**: Update content in a section file

**Parameters** (replace mode):
```json
{
  "section": "01_introduction_and_goals",
  "content": "# Introduction and Goals\n\n## Requirements Overview\n\nThis is my project overview.",
  "mode": "replace"
}
```

**Parameters** (append mode):
```json
{
  "section": "01_introduction_and_goals",
  "content": "\n\n## Additional Content\n\nAppended content here.",
  "mode": "append"
}
```

**Optional**: Test with `targetFolder` to update in a specific directory:
```json
{
  "section": "01_introduction_and_goals",
  "content": "# Content here...",
  "targetFolder": "/path/to/custom/project"
}
```

**Test**:
1. Run `arc42-init` first
2. Run `update-section` with content
3. Run `arc42-status` to see updated completion
4. Check the file in `test-project/arc42-docs/sections/01_introduction_and_goals.md`

### 6. get-section

**Purpose**: Read content from a specific section file

**Parameters**:
```json
{
  "section": "01_introduction_and_goals"
}
```

**Optional**: Test with `targetFolder` to read from a specific directory:
```json
{
  "section": "01_introduction_and_goals",
  "targetFolder": "/path/to/custom/project"
}
```

**Test**:
1. Run `arc42-init` first
2. Run `get-section` with a section name
3. Verify you receive the content of the section file

## Complete Test Workflow

Follow this sequence to fully test the MCP server:

```
1. Connect to the server
   ↓
2. Run: arc42-workflow-guide
   → Verify: Guide content returned
   ↓
3. Run: arc42-init { "projectName": "E-Commerce Platform" }
   → Verify: Success, directories created
   ↓
4. Run: arc42-status
   → Verify: 0% completion, all sections listed
   ↓
5. Run: generate-template { "section": "01_introduction_and_goals" }
   → Verify: Template content returned
   ↓
6. Run: update-section { "section": "01_introduction_and_goals", "content": "...", "mode": "replace" }
   → Verify: Success, file updated
   ↓
7. Run: arc42-status
   → Verify: Increased completion percentage
   ↓
8. Repeat steps 5-7 for other sections
```

## Troubleshooting

### "Connection Failed" Error (Option 1: npx)

- Verify the project is built (`npm run build`)
- Check that `dist/index.js` exists
- Use absolute paths in the Arguments field
- Ensure the test project directory exists

### "Connection Failed" Error (Option 2: Docker Compose)

If you see "Connection error: Failed to fetch" or "ERR_CONNECTION_REFUSED":

1. **Wrong paths**: Make sure you're using **container paths**, not local paths:
   - ✅ Correct: `/app/dist/index.js /project`
   - ❌ Wrong: `/Users/yourname/projects/Arc42-Node-MCP-Server/dist/index.js`

2. **Project not built**: The `dist` folder must exist locally before starting Docker:
   ```bash
   npm run build
   ```

3. **Missing node_modules**: Install dependencies first:
   ```bash
   npm install
   ```

4. **Container not running**: Check if the container is running:
   ```bash
   docker compose ps
   docker compose logs mcp-inspector
   ```

### "Project Not Initialized" Error

- Run `arc42-init` before using `arc42-status`, `update-section`, or `get-section`

### Tools Not Appearing

- Verify the connection status shows "Connected"
- Check the server logs in the Inspector's History panel
- Restart the inspector and reconnect

### "ENOENT" File Not Found Errors

- Ensure the workspace path exists and is writable
- Check file permissions on the test project directory

## Inspecting Request/Response

The MCP Inspector shows the full JSON-RPC communication:

1. **History Panel**: Shows all requests and responses
2. **Request Details**: Click on a history item to see the full request
3. **Response Details**: View the complete response including any errors

This is useful for:
- Debugging tool implementations
- Verifying correct MCP protocol usage
- Understanding the data flow

## Next Steps

After testing with MCP Inspector, you can:

1. **Integrate with Claude Desktop** - See [README.md](../README.md#setup-in-claude-desktop)
2. **Integrate with Cursor** - See [README.md](../README.md#setup-in-cursor)
3. **Integrate with Cline** - See [README.md](../README.md#setup-in-cline)
4. **Run automated tests** - `npm test` (ensure `npm install` is run first)
5. **Contribute improvements** - See [CONTRIBUTING.md](../CONTRIBUTING.md)
