/**
 * arc42 Template Reference Information
 * 
 * This file dynamically reads version info from the arc42-template submodule.
 * When the submodule is updated, this file automatically reflects the new version.
 * 
 * Source: https://github.com/arc42/arc42-template
 * Version file: vendor/arc42-template/EN/version.properties
 */

import { existsSync, readFileSync } from 'fs';
import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to submodule (relative to src/templates/)
const SUBMODULE_PATH = join(__dirname, '../../vendor/arc42-template');
const VERSION_FILE = join(SUBMODULE_PATH, 'EN/version.properties');
const SOURCE_REPO = 'https://github.com/arc42/arc42-template';

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
  /** Notes about any deviations from the original template */
  notes: string[];
}

/**
 * Parse version.properties file content
 */
function parseVersionProperties(content: string): { revnumber: string; revdate: string } {
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
 * Get commit SHA from git submodule
 */
function getSubmoduleCommitSha(): string {
  try {
    // Try to get commit from the submodule itself
    const result = execSync('git rev-parse HEAD', {
      cwd: SUBMODULE_PATH,
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe']
    });
    return result.trim();
  } catch {
    // Fallback: try to get from parent repo's submodule status
    try {
      const projectRoot = join(__dirname, '../..');
      const result = execSync('git submodule status vendor/arc42-template', {
        cwd: projectRoot,
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'pipe']
      });
      const match = result.match(/^\s*([a-f0-9]+)\s+vendor/);
      return match ? match[1] : 'unknown';
    } catch {
      return 'unknown';
    }
  }
}

/**
 * Read arc42 reference info from the submodule
 * Falls back to hardcoded values if submodule is not available
 */
function loadArc42Reference(): Arc42Reference {
  // Default/fallback values (used when submodule not available, e.g., npm install)
  const fallback: Arc42Reference = {
    version: '9.0-EN',
    date: 'July 2025',
    commitSha: 'b29e08928644af7ae49f51d729d14313db0d934c',
    sourceRepo: SOURCE_REPO,
    submoduleAvailable: false,
    notes: [
      'Templates adapted from AsciiDoc to Markdown format',
      'Section guidance text customized for AI-assisted documentation',
      'Fallback values used - submodule not available'
    ]
  };

  // Check if submodule exists
  if (!existsSync(SUBMODULE_PATH) || !existsSync(VERSION_FILE)) {
    return fallback;
  }

  try {
    // Read version.properties
    const content = readFileSync(VERSION_FILE, 'utf-8');
    const { revnumber, revdate } = parseVersionProperties(content);

    if (!revnumber || !revdate) {
      console.warn('Warning: Could not parse version.properties, using fallback');
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
      notes: [
        'Templates adapted from AsciiDoc to Markdown format',
        'Section guidance text customized for AI-assisted documentation'
      ]
    };
  } catch (error) {
    console.warn('Warning: Failed to read from submodule, using fallback:', error);
    return fallback;
  }
}

/**
 * Reference information for the arc42 template version this MCP server is based on.
 * This is loaded dynamically from the submodule at module initialization.
 */
export const ARC42_REFERENCE: Arc42Reference = loadArc42Reference();

/**
 * Get a formatted string describing the arc42 reference version
 */
export function getArc42ReferenceString(): string {
  return `arc42 Template v${ARC42_REFERENCE.version} (${ARC42_REFERENCE.date})`;
}

/**
 * Get the full reference information as a Markdown block
 */
export function getArc42ReferenceMarkdown(): string {
  return `---
**arc42 Template Reference**
- Version: ${ARC42_REFERENCE.version}
- Date: ${ARC42_REFERENCE.date}
- Source: [arc42-template](${ARC42_REFERENCE.sourceRepo})
- Commit: \`${ARC42_REFERENCE.commitSha.substring(0, 7)}\`
---`;
}

/**
 * Get reference info suitable for config.yaml
 */
export function getArc42ReferenceConfig(): Record<string, string> {
  return {
    arc42_template_version: ARC42_REFERENCE.version,
    arc42_template_date: ARC42_REFERENCE.date,
    arc42_template_source: ARC42_REFERENCE.sourceRepo,
    arc42_template_commit: ARC42_REFERENCE.commitSha
  };
}

/**
 * Force reload the reference from submodule (useful for testing)
 */
export function reloadArc42Reference(): Arc42Reference {
  return loadArc42Reference();
}
