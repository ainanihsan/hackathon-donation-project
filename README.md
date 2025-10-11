# Welcome to your Lovable project
## Contributors
Tammy Sisodiya, Ainan Ihsan, Silke Nodwell, Nino Godoradze

## Project info

**URL**: https://lovable.dev/projects/7ef69557-d6e8-415b-a1aa-6cddd06b655b

## How to run project
### Run the API
1. Create conda environment: 
```
conda env create -f environment.yml
conda activate faiss-env
```
2. FIRST TIME ONLY: Run `python build_faiss_index.py` OR ask one of the contributors mentioned above for the charity_faiss.index and charity_faiss_mapping.json files. (`build_faiss_index.py` takes ~40 min to run on a CPU)
3. Run `uvicorn charity_recommender.api:app --reload` to start the local API server
4. Go to "http://127.0.0.1:8000/docs" to view the Swagger docs and try out the API. Alternatively, run the following from the terminal:
```
curl -X POST "http://localhost:8000/recommend" -H "Content-Type: application/json" \
-d '{"query": "helping homeless"}'
```

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/7ef69557-d6e8-415b-a1aa-6cddd06b655b) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/7ef69557-d6e8-415b-a1aa-6cddd06b655b) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
