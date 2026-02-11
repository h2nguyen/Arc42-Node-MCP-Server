#!/usr/bin/env npx tsx
/**
 * Show arc42 Template Version
 * 
 * This script displays the current arc42 template version info
 * from the submodule. Useful for verifying the submodule state.
 * 
 * Note: Since arc42-reference.ts now reads dynamically from the submodule,
 * this script is mainly for debugging/verification purposes.
 * 
 * Usage:
 *   npm run show:arc42-version
 *   # or
 *   npx tsx scripts/show-arc42-version.ts
 */

import { readFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const SUBMODULE_PATH = join(projectRoot, 'vendor/arc42-template');
const VERSION_FILE = join(SUBMODULE_PATH, 'EN/version.properties');

function parseVersionProperties(content: string): Record<string, string> {
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
  
  return props;
}

function getSubmoduleCommitSha(): string {
  try {
    const result = execSync('git rev-parse HEAD', {
      cwd: SUBMODULE_PATH,
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe']
    });
    return result.trim();
  } catch {
    return 'unknown';
  }
}

function getSubmoduleStatus(): string {
  try {
    const result = execSync('git submodule status vendor/arc42-template', {
      cwd: projectRoot,
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe']
    });
    return result.trim();
  } catch {
    return 'unknown';
  }
}

function main(): void {
  console.log('📋 arc42 Template Submodule Information\n');
  console.log('=' .repeat(50));

  // Check if submodule exists
  if (!existsSync(SUBMODULE_PATH)) {
    console.log('\n❌ Submodule not found at vendor/arc42-template');
    console.log('   Initialize it with: npm run submodule:init');
    process.exit(1);
  }

  if (!existsSync(VERSION_FILE)) {
    console.log('\n❌ Version file not found - submodule may not be initialized properly');
    console.log('   Try: npm run submodule:init');
    process.exit(1);
  }

  // Read and display version.properties
  const content = readFileSync(VERSION_FILE, 'utf-8');
  const props = parseVersionProperties(content);

  console.log('\n📁 Submodule Path:', SUBMODULE_PATH);
  console.log('📄 Version File:', VERSION_FILE);
  console.log('\n📋 version.properties contents:');
  console.log('-'.repeat(50));
  
  for (const [key, value] of Object.entries(props)) {
    console.log(`   ${key}: ${value}`);
  }

  // Get commit info
  const commitSha = getSubmoduleCommitSha();
  const status = getSubmoduleStatus();

  console.log('\n🔗 Git Information:');
  console.log('-'.repeat(50));
  console.log(`   Commit SHA: ${commitSha}`);
  console.log(`   Short SHA:  ${commitSha.substring(0, 7)}`);
  console.log(`   Status:     ${status}`);

  // Summary
  console.log('\n✅ Summary:');
  console.log('-'.repeat(50));
  console.log(`   Version:    ${props['revnumber'] || 'unknown'}`);
  console.log(`   Date:       ${props['revdate'] || 'unknown'}`);
  console.log(`   Commit:     ${commitSha.substring(0, 7)}`);

  console.log('\n💡 Tips:');
  console.log('   - Update submodule: npm run submodule:update');
  console.log('   - Version is read dynamically - no manual sync needed');
  console.log('   - Rebuild after update: npm run build');
}

main();
