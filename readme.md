# Sampler

This project exists to commit data to a static site so that fancy charts and graphs can be built.

## Docker Vars

App runs on port `3000`

Paths to mount:
- `/data/` where the repo gets cloned and worked on
- `/config/` where config file lives

Variables:
- `GITHUB_TOKEN`: A github token with permission to clone and commit on private repos
