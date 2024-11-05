# Napkins react Native

An open source wireframe to app generator. Powered by Llama 3.2 Vision & groq.

## Tech stack

- [Llama 3.2 vision 90B](https://ai.meta.com/blog/meta-llama-3.2/) from Meta for the LLM
- [Llama 3.2 text 90B ](https://ai.meta.com/blog/meta-llama-3-1/) from Meta for the Vision model
- [GROQ](https://groq.com/) for LLM inference
- [Uploadthing](https://uploadthing.com/) for image storage
- Next.js app router with Tailwind
- Expo snack SDK

## Cloning & running

1. Clone the repo: `git clone https://github.com/mundume/quickchat-ai`
2. Create a `.env.local` file and add your [GROQ](https://console.groq.com/): `GROQ_API_KEY=`
3. Create an uploadthing accout and add the credentials to your `.env.local` file. All required values are in the `.env.example` file.
4. Run `pnpm i` and `pnpm dev` to install dependencies and run locally

### Inspiration

This project was inspired by the Amazing [Nutlope's Napkins.dev ](https://github.com/nutlope/napkins)
