# Clean Release Flow with Protected `main`-branch

## Step 1 – Prepare a Release Branch

Create a short-lived release branch from `main`:

```bash
git checkout main
git pull
git checkout -b release/2.1.1
```

On this branch:
- Update CHANGELOG.md
- Bump version (package.json)
- Commit

Example:

```bash
npm version minor --no-git-tag-version
git add .
git commit -m "chore(release): 2.1.1"
```

> [!IMPORTANT]
> 
> Use `--no-git-tag-version` if your PR policy does not allow tags before merge.

## Step 2 – Open Pull Request → main

- PR from `release/2.1.1` → `main`
- CI runs
- Review happens
- Merge via squash or merge commit (team policy dependent)

Now the main contains:
- Final changelog
- Final version
- Release commit

## Step 3 – Create Tag

### Manual Tag After Merge

After PR is merged:

```bash
git checkout main
git pull
git tag v2.1.1
git push origin v2.1.1
```

## Why Not Tag Inside the PR?

Because:
- The commit hash changes if using squash merge
- Tags must reference the final commit on main
- Tagging before merge risks mismatch

A release tag must always reference a commit that lives on main.
