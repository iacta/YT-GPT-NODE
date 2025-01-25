# Youtube GPT

## Introduction
A simple system that downloads YouTube videos, transcribes them into text, and uploads the text to GPT for summarization and explanation.

## Requirements
- Node.js installed on your machine.
- An **OpenAI** API key and an **AssemblyAI** API key.

## How to Run?

### 1. Configure your environment variables
Create a `.env` file in the root of your project and add your API keys as follows:

```env
OPENAI_ORG="your-openai-organization-id"
OPENAI_PROJECT="your-openai-project-id"
ASSEMBLYAI_API_KEY="your-assemblyai-api-key"
```

### 2. Install the necessary dependencies
Run the following command to install all the required dependencies:

```cmd
npm install
```

### 3. Run the system
Once the environment variables are set and the dependencies are installed, you can run the `index.js` file. When prompted, paste the YouTube video link to download and transcribe it.

```cmd
node index.js
```

### 4. Output
After running the command, the system will print the summarized and explained content of the YouTube video in the console.
