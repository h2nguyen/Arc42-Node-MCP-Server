/**
 * arc42 Template Reference Information
 *
 * This file dynamically reads version info from the arc42-template submodule.
 * When the submodule is updated, this file automatically reflects the new version.
 *
 * Source: https://github.com/arc42/arc42-template
 * Version file: vendor/arc42-template/{LANG}/version.properties
 */

import { existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to submodule (relative to src/templates/)
const SUBMODULE_PATH = join(__dirname, '../../vendor/arc42-template');
const SOURCE_REPO = 'https://github.com/arc42/arc42-template';

/** Supported languages in the arc42 template */
export type Arc42Language = 'EN' | 'DE' | 'ES' | 'FR' | 'IT' | 'NL' | 'PT' | 'RU' | 'CZ' | 'UKR' | 'ZH';

/** Default language for arc42 templates */
export const DEFAULT_LANGUAGE: Arc42Language = 'EN';

/** List of all supported languages */
export const SUPPORTED_LANGUAGES: Arc42Language[] = ['EN', 'DE', 'ES', 'FR', 'IT', 'NL', 'PT', 'RU', 'CZ', 'UKR', 'ZH'];

/**
 * Get the version file path for a specific language
 */
function getVersionFilePath(language: Arc42Language = DEFAULT_LANGUAGE): string {
  return join(SUBMODULE_PATH, language, 'version.properties');
}

export interface Arc42Reference {
  /** The arc42 template version (e.g., "9.0-EN") */
  version: string;
  /** Release date of the referenced version */
  date: string;
  /** Git commit SHA from arc42/arc42-template repository */
  commitSha: string;
  /** Source repository URL */
  sourceRepo: string;
  /** Whether the submodule is available */
  submoduleAvailable: boolean;
  /** Language code used for this reference */
  language: Arc42Language;
  /** Notes about any deviations from the original template */
  notes: string[];
}

/**
 * Parse version.properties file content
 * @internal Exported for testing purposes
 */
export function parseVersionProperties(content: string): { revnumber: string; revdate: string } {
  const lines = content.split('\n');
  const props: Record<string, string> = {};
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        props[key.trim()] = valueParts.join('=').trim();
      }
    }
  }
  
  return {
    revnumber: props['revnumber'] || '',
    revdate: props['revdate'] || ''
  };
}

/**
 * Get commit SHA from git submodule by reading .git files directly
 * (Avoids shell access for security - no execSync required)
 * @internal Exported for testing purposes
 */
export function getSubmoduleCommitSha(): string {
  try {
    // Method 1: Read from submodule's .git file (gitdir reference)
    const submoduleGitPath = join(SUBMODULE_PATH, '.git');
    if (existsSync(submoduleGitPath)) {
      const gitContent = readFileSync(submoduleGitPath, 'utf-8').trim();

      // .git file in submodule contains "gitdir: ../../.git/modules/vendor/arc42-template"
      if (gitContent.startsWith('gitdir:')) {
        const gitDir = gitContent.replace('gitdir:', '').trim();
        const resolvedGitDir = join(SUBMODULE_PATH, gitDir);
        const headPath = join(resolvedGitDir, 'HEAD');

        if (existsSync(headPath)) {
          const headContent = readFileSync(headPath, 'utf-8').trim();

          // HEAD can be a direct commit SHA or a ref
          if (headContent.startsWith('ref:')) {
            const refPath = join(resolvedGitDir, headContent.replace('ref:', '').trim());
            if (existsSync(refPath)) {
              return readFileSync(refPath, 'utf-8').trim();
            }
          } else {
            // Direct commit SHA
            return headContent;
          }
        }
      }
    }

    // Method 2: Read from parent repo's .git/modules directory
    const projectRoot = join(__dirname, '../..');
    const modulesHeadPath = join(projectRoot, '.git/modules/vendor/arc42-template/HEAD');
    if (existsSync(modulesHeadPath)) {
      const headContent = readFileSync(modulesHeadPath, 'utf-8').trim();
      if (!headContent.startsWith('ref:')) {
        return headContent;
      }
      // If it's a ref, resolve it
      const refPath = join(projectRoot, '.git/modules/vendor/arc42-template', headContent.replace('ref:', '').trim());
      if (existsSync(refPath)) {
        return readFileSync(refPath, 'utf-8').trim();
      }
    }

    return 'unknown';
  } catch {
    return 'unknown';
  }
}

/**
 * Read arc42 reference info from the submodule for a specific language
 * Falls back to hardcoded values if submodule is not available
 * @param language - Language code (defaults to EN)
 */
function loadArc42Reference(language: Arc42Language = DEFAULT_LANGUAGE): Arc42Reference {
  // Default/fallback values (used when submodule not available, e.g., npm install)
  const fallback: Arc42Reference = {
    version: `9.0-${language}`,
    date: 'July 2025',
    commitSha: 'b29e08928644af7ae49f51d729d14313db0d934c',
    sourceRepo: SOURCE_REPO,
    submoduleAvailable: false,
    language,
    notes: [
      'Templates adapted from AsciiDoc to Markdown format',
      'Section guidance text customized for AI-assisted documentation',
      'Fallback values used - submodule not available'
    ]
  };

  const versionFile = getVersionFilePath(language);

  // Check if submodule exists
  if (!existsSync(SUBMODULE_PATH) || !existsSync(versionFile)) {
    return fallback;
  }

  try {
    // Read version.properties
    const content = readFileSync(versionFile, 'utf-8');
    const { revnumber, revdate } = parseVersionProperties(content);

    if (!revnumber || !revdate) {
      console.warn(`Warning: Could not parse version.properties for ${language}, using fallback`);
      return fallback;
    }

    // Get commit SHA
    const commitSha = getSubmoduleCommitSha();

    return {
      version: revnumber,
      date: revdate,
      commitSha,
      sourceRepo: SOURCE_REPO,
      submoduleAvailable: true,
      language,
      notes: [
        'Templates adapted from AsciiDoc to Markdown format',
        'Section guidance text customized for AI-assisted documentation'
      ]
    };
  } catch (error) {
    console.warn(`Warning: Failed to read from submodule for ${language}, using fallback:`, error);
    return fallback;
  }
}

/**
 * Reference information for the arc42 template version this MCP server is based on.
 * This is loaded dynamically from the submodule at module initialization (default: English).
 */
export const ARC42_REFERENCE: Arc42Reference = loadArc42Reference();

/**
 * Get arc42 reference information for a specific language
 * @param language - Language code (defaults to EN)
 */
export function getArc42ReferenceForLanguage(language: Arc42Language = DEFAULT_LANGUAGE): Arc42Reference {
  return loadArc42Reference(language);
}

/**
 * Get a formatted string describing the arc42 reference version
 * @param language - Language code (defaults to EN)
 */
export function getArc42ReferenceString(language?: Arc42Language): string {
  const ref = language ? loadArc42Reference(language) : ARC42_REFERENCE;
  return `arc42 Template v${ref.version} (${ref.date})`;
}

/**
 * Get the full reference information as a Markdown block
 * @param language - Language code (defaults to EN)
 */
export function getArc42ReferenceMarkdown(language?: Arc42Language): string {
  const ref = language ? loadArc42Reference(language) : ARC42_REFERENCE;
  return `---
**arc42 Template Reference**
- Version: ${ref.version}
- Date: ${ref.date}
- Language: ${ref.language}
- Source: [arc42-template](${ref.sourceRepo})
- Commit: \`${ref.commitSha.substring(0, 7)}\`
---`;
}

/**
 * Get reference info suitable for config.yaml
 * @param language - Language code (defaults to EN)
 */
export function getArc42ReferenceConfig(language?: Arc42Language): Record<string, string> {
  const ref = language ? loadArc42Reference(language) : ARC42_REFERENCE;
  return {
    arc42_template_version: ref.version,
    arc42_template_date: ref.date,
    arc42_template_language: ref.language,
    arc42_template_source: ref.sourceRepo,
    arc42_template_commit: ref.commitSha
  };
}

/**
 * Force reload the reference from submodule (useful for testing)
 * @param language - Language code (defaults to EN)
 */
export function reloadArc42Reference(language?: Arc42Language): Arc42Reference {
  return loadArc42Reference(language);
}
