# InsightsLM Local - Required Environment Variables

## Step 3: Configure Environment Variables

Add these variables to your main `.env` file in the root directory:

```bash
############
# InsightsLM Local - N8N Webhook URLs
# These will be set after importing workflows in N8N (Step 9)
# Replace with your actual N8N webhook URLs once workflows are imported
############

NOTEBOOK_CHAT_URL=http://localhost:5678/webhook/your-chat-webhook-id
NOTEBOOK_GENERATION_URL=http://localhost:5678/webhook/your-generation-webhook-id
AUDIO_GENERATION_WEBHOOK_URL=http://localhost:5678/webhook/your-audio-webhook-id
DOCUMENT_PROCESSING_WEBHOOK_URL=http://localhost:5678/webhook/your-document-webhook-id
ADDITIONAL_SOURCES_WEBHOOK_URL=http://localhost:5678/webhook/your-additional-sources-webhook-id

############
# InsightsLM Local - Webhook Authentication
# Generate a secure random string for webhook authentication
# Use: openssl rand -hex 32
# Or: python -c "import secrets; print(secrets.token_hex(32))"
############

NOTEBOOK_GENERATION_AUTH=your-secure-auth-key-here

############
# InsightsLM Local - OpenAI API Key
# Required for generate-note-title function
############

OPENAI_API_KEY=your-openai-api-key-here
```

## Notes

1. **Webhook URLs**: These will be populated after you import the N8N workflows in Step 9. For now, you can use placeholder values, but you'll need to update them with the actual webhook URLs from N8N.

2. **NOTEBOOK_GENERATION_AUTH**: This is the authentication key that will be used as the Authorization header value for all N8N webhooks. Generate a secure random string.

3. **OPENAI_API_KEY**: Required for the note title generation feature. You can get this from <https://platform.openai.com/api-keys>

## After adding these variables

- Make sure your main `.env` file has all the base variables from `.env.example`
- Add these InsightsLM-specific variables at the end of your `.env` file
- Do NOT wrap values in quotes (e.g., use `KEY=value` not `KEY="value"`)
