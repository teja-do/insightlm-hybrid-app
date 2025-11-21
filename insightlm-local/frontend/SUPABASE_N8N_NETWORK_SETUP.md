# Running Supabase and n8n on 0.0.0.0 (Network Access)

This guide explains how to configure Supabase and n8n to bind to `0.0.0.0` instead of `localhost`, allowing access from other machines on your network or from containers.

## Supabase Configuration

### Option 1: Using Environment Variables (Recommended)

When starting Supabase, set the `SUPABASE_API_HOST` environment variable:

**Windows (PowerShell):**
```powershell
$env:SUPABASE_API_HOST="0.0.0.0"
supabase start
```

**Windows (CMD):**
```cmd
set SUPABASE_API_HOST=0.0.0.0
supabase start
```

**Linux/Mac:**
```bash
export SUPABASE_API_HOST=0.0.0.0
supabase start
```

### Option 2: Using Docker Compose Directly

If you're running Supabase via Docker Compose, you can modify the docker-compose file or use environment variables:

```bash
SUPABASE_API_HOST=0.0.0.0 supabase start
```

### Option 3: Update config.toml (Partial Solution)

The `config.toml` file has been updated to use `0.0.0.0` for the Studio API URL. However, you still need to set environment variables for the main API services.

### Additional Supabase Services

To bind all Supabase services to `0.0.0.0`, you may need to set:

```bash
# For API Gateway
SUPABASE_API_HOST=0.0.0.0

# For Realtime
SUPABASE_REALTIME_HOST=0.0.0.0

# For Studio
SUPABASE_STUDIO_HOST=0.0.0.0
```

**Note:** Supabase CLI may not expose all these variables. If you need full control, you may need to use Docker Compose directly or modify the generated docker-compose.yml.

## n8n Configuration

### Option 1: Using Environment Variables (Recommended)

Set the `N8N_HOST` environment variable before starting n8n:

**Windows (PowerShell):**
```powershell
$env:N8N_HOST="0.0.0.0"
n8n start
```

**Windows (CMD):**
```cmd
set N8N_HOST=0.0.0.0
n8n start
```

**Linux/Mac:**
```bash
export N8N_HOST=0.0.0.0
n8n start
```

### Option 2: Using Command-Line Flags

```bash
n8n start --host 0.0.0.0
```

### Option 3: Using .env File

Create a `.env` file in your n8n directory (or where you run n8n):

```env
N8N_HOST=0.0.0.0
N8N_PORT=5678
N8N_PROTOCOL=http
```

### Option 4: Docker/Docker Compose

If running n8n in Docker:

```yaml
services:
  n8n:
    image: n8nio/n8n
    environment:
      - N8N_HOST=0.0.0.0
      - N8N_PORT=5678
    ports:
      - "5678:5678"
```

Or using docker run:

```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -e N8N_HOST=0.0.0.0 \
  n8nio/n8n
```

## Complete Example: Starting Both Services

### Windows (PowerShell)

```powershell
# Terminal 1 - Start Supabase
$env:SUPABASE_API_HOST="0.0.0.0"
supabase start

# Terminal 2 - Start n8n
$env:N8N_HOST="0.0.0.0"
n8n start
```

### Linux/Mac

```bash
# Terminal 1 - Start Supabase
export SUPABASE_API_HOST=0.0.0.0
supabase start

# Terminal 2 - Start n8n
export N8N_HOST=0.0.0.0
n8n start
```

## Verifying Network Access

After starting both services:

1. **Supabase API**: Should be accessible at `http://<your-ip>:54321`
2. **Supabase Studio**: Should be accessible at `http://<your-ip>:54323`
3. **n8n**: Should be accessible at `http://<your-ip>:5678`

Replace `<your-ip>` with your machine's IP address (e.g., `192.168.1.100`).

## Security Considerations

⚠️ **Warning**: Binding to `0.0.0.0` makes your services accessible from any machine on your network. This is fine for development but should be used with caution:

1. **Firewall**: Ensure your firewall is properly configured
2. **Authentication**: Make sure authentication is enabled and properly configured
3. **HTTPS**: For production, use HTTPS with proper certificates
4. **Network Isolation**: Consider using a VPN or isolated network for development

## Troubleshooting

### Supabase not accessible from network

1. Check if the environment variable is set: `echo $SUPABASE_API_HOST` (Linux/Mac) or `echo $env:SUPABASE_API_HOST` (PowerShell)
2. Verify Docker containers are running: `docker ps`
3. Check firewall settings
4. Try accessing via IP address instead of hostname

### n8n not accessible from network

1. Verify N8N_HOST is set: `echo $N8N_HOST` (Linux/Mac) or `echo $env:N8N_HOST` (PowerShell)
2. Check if n8n is listening on the correct interface: `netstat -an | grep 5678` (or `ss -tulpn | grep 5678` on Linux)
3. Ensure port 5678 is not blocked by firewall
4. Check n8n logs for binding errors

## Additional Resources

- [Supabase CLI Documentation](https://supabase.com/docs/guides/cli)
- [n8n Documentation](https://docs.n8n.io/)
- [n8n Environment Variables](https://docs.n8n.io/hosting/configuration/environment-variables/)


