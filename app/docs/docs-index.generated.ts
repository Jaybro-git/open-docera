// GENERATED FILE -- do not edit.
// Run `node scripts/build-docs-index.mjs` (or npm run dev / npm run build) to
// regenerate from content/docs/*.mdx.

import type { PageMeta, SearchRecord, TocItem } from "./search-types";

/** Every published page, from frontmatter, in file-name order. docs-data.ts sorts them. */
export const PAGES: PageMeta[] = [
  {
    "id": "changelog",
    "title": "Changelog",
    "desc": "What shipped in each release.",
    "group": "Reference",
    "order": 2
  },
  {
    "id": "cli",
    "title": "CLI",
    "desc": "Commands, flags and exit codes for the acme command-line tool.",
    "group": "Reference",
    "order": 1
  },
  {
    "id": "components",
    "title": "Components",
    "desc": "A tour of every building block you can use inside a docs page.",
    "group": "Guides",
    "order": 3,
    "tag": "new"
  },
  {
    "id": "concepts",
    "title": "Core concepts",
    "desc": "Widgets, pipelines and targets, and how they fit together.",
    "group": "Get started",
    "order": 3
  },
  {
    "id": "configuration",
    "title": "Configuration",
    "desc": "Every option in acme.config.json and when you'd change it.",
    "group": "Guides",
    "order": 1
  },
  {
    "id": "intro",
    "title": "Introduction",
    "desc": "What Acme is, who it's for, and how these docs are organized.",
    "group": "Get started",
    "order": 1
  },
  {
    "id": "quickstart",
    "title": "Quickstart",
    "desc": "Install Acme and ship your first widget in about five minutes.",
    "group": "Get started",
    "order": 2
  },
  {
    "id": "theming",
    "title": "Theming",
    "desc": "Change colors, fonts and spacing without touching component code.",
    "group": "Guides",
    "order": 2
  }
];

/** Right-hand "On this page" anchors. Sections with no h2 are absent. */
export const TOC_BY_SECTION: Record<string, TocItem[]> = {
  "changelog": [
    {
      "id": "120",
      "label": "1.2.0"
    },
    {
      "id": "110",
      "label": "1.1.0"
    },
    {
      "id": "100",
      "label": "1.0.0"
    }
  ],
  "cli": [
    {
      "id": "the-acme-command",
      "label": "The acme command"
    },
    {
      "id": "commands",
      "label": "Commands"
    },
    {
      "id": "global-flags",
      "label": "Global flags"
    },
    {
      "id": "exit-codes",
      "label": "Exit codes"
    }
  ],
  "components": [
    {
      "id": "building-blocks",
      "label": "Building blocks"
    },
    {
      "id": "lead-and-badges",
      "label": "Lead and badges"
    },
    {
      "id": "callouts",
      "label": "Callouts"
    },
    {
      "id": "code-tabs",
      "label": "Code tabs"
    },
    {
      "id": "steps",
      "label": "Steps"
    },
    {
      "id": "cards",
      "label": "Cards"
    },
    {
      "id": "tables-and-status",
      "label": "Tables and status"
    }
  ],
  "concepts": [
    {
      "id": "the-three-building-blocks",
      "label": "The three building blocks"
    },
    {
      "id": "widgets",
      "label": "Widgets"
    },
    {
      "id": "pipelines",
      "label": "Pipelines"
    },
    {
      "id": "targets",
      "label": "Targets"
    }
  ],
  "configuration": [
    {
      "id": "the-config-file",
      "label": "The config file"
    },
    {
      "id": "options",
      "label": "Options"
    },
    {
      "id": "environment-overrides",
      "label": "Environment overrides"
    }
  ],
  "intro": [
    {
      "id": "what-acme-is",
      "label": "What Acme is"
    },
    {
      "id": "why-it-exists",
      "label": "Why it exists"
    },
    {
      "id": "who-its-for",
      "label": "Who it's for"
    },
    {
      "id": "how-these-docs-are-organized",
      "label": "How these docs are organized"
    }
  ],
  "quickstart": [
    {
      "id": "install-acme",
      "label": "Install Acme"
    },
    {
      "id": "prerequisites",
      "label": "Prerequisites"
    },
    {
      "id": "create-a-project",
      "label": "Create a project"
    },
    {
      "id": "ship-your-first-widget",
      "label": "Ship your first widget"
    },
    {
      "id": "default-ports",
      "label": "Default ports"
    }
  ],
  "theming": [
    {
      "id": "theme-tokens",
      "label": "Theme tokens"
    },
    {
      "id": "built-in-tokens",
      "label": "Built-in tokens"
    },
    {
      "id": "overriding-tokens",
      "label": "Overriding tokens"
    },
    {
      "id": "dark-mode",
      "label": "Dark mode"
    }
  ]
};

/** Heading and body records per section, in document order. */
export const SECTION_RECORDS: Record<string, SearchRecord[]> = {
  "changelog": [
    {
      "key": "heading:changelog:120:0",
      "sectionId": "changelog",
      "headingId": "120",
      "kind": "heading",
      "title": "1.2.0",
      "body": ""
    },
    {
      "key": "content:changelog:120:1",
      "sectionId": "changelog",
      "headingId": "120",
      "kind": "content",
      "title": "1.2.0",
      "body": "Latest 2026-11-01"
    },
    {
      "key": "content:changelog:120:2",
      "sectionId": "changelog",
      "headingId": "120",
      "kind": "content",
      "title": "1.2.0",
      "body": "Added the test pipeline step."
    },
    {
      "key": "content:changelog:120:3",
      "sectionId": "changelog",
      "headingId": "120",
      "kind": "content",
      "title": "1.2.0",
      "body": "acme deploy now prints the deployed URL."
    },
    {
      "key": "heading:changelog:110:4",
      "sectionId": "changelog",
      "headingId": "110",
      "kind": "heading",
      "title": "1.1.0",
      "body": ""
    },
    {
      "key": "content:changelog:110:5",
      "sectionId": "changelog",
      "headingId": "110",
      "kind": "content",
      "title": "1.1.0",
      "body": "2026-09-15"
    },
    {
      "key": "content:changelog:110:6",
      "sectionId": "changelog",
      "headingId": "110",
      "kind": "content",
      "title": "1.1.0",
      "body": "Environment overrides with the ACME_ prefix."
    },
    {
      "key": "content:changelog:110:7",
      "sectionId": "changelog",
      "headingId": "110",
      "kind": "content",
      "title": "1.1.0",
      "body": "Faster cold starts for acme dev."
    },
    {
      "key": "heading:changelog:100:8",
      "sectionId": "changelog",
      "headingId": "100",
      "kind": "heading",
      "title": "1.0.0",
      "body": ""
    },
    {
      "key": "content:changelog:100:9",
      "sectionId": "changelog",
      "headingId": "100",
      "kind": "content",
      "title": "1.0.0",
      "body": "2026-07-01"
    },
    {
      "key": "content:changelog:100:10",
      "sectionId": "changelog",
      "headingId": "100",
      "kind": "content",
      "title": "1.0.0",
      "body": "First stable release."
    }
  ],
  "cli": [
    {
      "key": "heading:cli:the-acme-command:0",
      "sectionId": "cli",
      "headingId": "the-acme-command",
      "kind": "heading",
      "title": "The acme command",
      "body": ""
    },
    {
      "key": "content:cli:the-acme-command:1",
      "sectionId": "cli",
      "headingId": "the-acme-command",
      "kind": "content",
      "title": "The acme command",
      "body": "The acme CLI wraps every project task. Run acme --help to list commands, or acme <command> --help for one command's flags."
    },
    {
      "key": "heading:cli:commands:2",
      "sectionId": "cli",
      "headingId": "commands",
      "kind": "heading",
      "title": "Commands",
      "body": ""
    },
    {
      "key": "content:cli:commands:3",
      "sectionId": "cli",
      "headingId": "commands",
      "kind": "content",
      "title": "Commands",
      "body": "acme init Scaffold a new project in the current folder"
    },
    {
      "key": "content:cli:commands:4",
      "sectionId": "cli",
      "headingId": "commands",
      "kind": "content",
      "title": "Commands",
      "body": "acme dev Start the dev server with live reload"
    },
    {
      "key": "content:cli:commands:5",
      "sectionId": "cli",
      "headingId": "commands",
      "kind": "content",
      "title": "Commands",
      "body": "acme build Run the pipeline and write output to outDir"
    },
    {
      "key": "content:cli:commands:6",
      "sectionId": "cli",
      "headingId": "commands",
      "kind": "content",
      "title": "Commands",
      "body": "acme deploy Ship the latest build to a target"
    },
    {
      "key": "heading:cli:global-flags:7",
      "sectionId": "cli",
      "headingId": "global-flags",
      "kind": "heading",
      "title": "Global flags",
      "body": ""
    },
    {
      "key": "content:cli:global-flags:8",
      "sectionId": "cli",
      "headingId": "global-flags",
      "kind": "content",
      "title": "Global flags",
      "body": "--config <path> Use a config file other than acme.config.json"
    },
    {
      "key": "content:cli:global-flags:9",
      "sectionId": "cli",
      "headingId": "global-flags",
      "kind": "content",
      "title": "Global flags",
      "body": "--verbose Print every pipeline step as it runs"
    },
    {
      "key": "content:cli:global-flags:10",
      "sectionId": "cli",
      "headingId": "global-flags",
      "kind": "content",
      "title": "Global flags",
      "body": "--quiet Print errors only"
    },
    {
      "key": "heading:cli:exit-codes:11",
      "sectionId": "cli",
      "headingId": "exit-codes",
      "kind": "heading",
      "title": "Exit codes",
      "body": ""
    },
    {
      "key": "content:cli:exit-codes:12",
      "sectionId": "cli",
      "headingId": "exit-codes",
      "kind": "content",
      "title": "Exit codes",
      "body": "0 Success"
    },
    {
      "key": "content:cli:exit-codes:13",
      "sectionId": "cli",
      "headingId": "exit-codes",
      "kind": "content",
      "title": "Exit codes",
      "body": "1 Build or deploy failed"
    },
    {
      "key": "content:cli:exit-codes:14",
      "sectionId": "cli",
      "headingId": "exit-codes",
      "kind": "content",
      "title": "Exit codes",
      "body": "2 Invalid config or flags"
    }
  ],
  "components": [
    {
      "key": "heading:components:building-blocks:0",
      "sectionId": "components",
      "headingId": "building-blocks",
      "kind": "heading",
      "title": "Building blocks",
      "body": ""
    },
    {
      "key": "content:components:building-blocks:1",
      "sectionId": "components",
      "headingId": "building-blocks",
      "kind": "content",
      "title": "Building blocks",
      "body": "This page shows every component available inside a docs page. Copy any snippet into your own .mdx file. Headings start at ## — the page title comes from the title in the frontmatter."
    },
    {
      "key": "heading:components:lead-and-badges:2",
      "sectionId": "components",
      "headingId": "lead-and-badges",
      "kind": "heading",
      "title": "Lead and badges",
      "body": ""
    },
    {
      "key": "content:components:lead-and-badges:3",
      "sectionId": "components",
      "headingId": "lead-and-badges",
      "kind": "content",
      "title": "Lead and badges",
      "body": "<Lead> styles the opening paragraph. <Badges> adds small chips under it."
    },
    {
      "key": "content:components:lead-and-badges:4",
      "sectionId": "components",
      "headingId": "lead-and-badges",
      "kind": "content",
      "title": "Lead and badges",
      "body": "v1.0 MIT Stable"
    },
    {
      "key": "content:components:lead-and-badges:5",
      "sectionId": "components",
      "headingId": "lead-and-badges",
      "kind": "content",
      "title": "Lead and badges",
      "body": "<Lead>Opening paragraph.</Lead> <Badges items={[\"v1.0\", \"MIT\"]} />"
    },
    {
      "key": "heading:components:callouts:6",
      "sectionId": "components",
      "headingId": "callouts",
      "kind": "heading",
      "title": "Callouts",
      "body": ""
    },
    {
      "key": "content:components:callouts:7",
      "sectionId": "components",
      "headingId": "callouts",
      "kind": "content",
      "title": "Callouts",
      "body": "A note Use tone=\"note\" for helpful context."
    },
    {
      "key": "content:components:callouts:8",
      "sectionId": "components",
      "headingId": "callouts",
      "kind": "content",
      "title": "Callouts",
      "body": "A warning Use tone=\"warn\" for anything that can go wrong."
    },
    {
      "key": "heading:components:code-tabs:9",
      "sectionId": "components",
      "headingId": "code-tabs",
      "kind": "heading",
      "title": "Code tabs",
      "body": ""
    },
    {
      "key": "content:components:code-tabs:10",
      "sectionId": "components",
      "headingId": "code-tabs",
      "kind": "content",
      "title": "Code tabs",
      "body": "brew install acme"
    },
    {
      "key": "content:components:code-tabs:11",
      "sectionId": "components",
      "headingId": "code-tabs",
      "kind": "content",
      "title": "Code tabs",
      "body": "winget install acme"
    },
    {
      "key": "heading:components:steps:12",
      "sectionId": "components",
      "headingId": "steps",
      "kind": "heading",
      "title": "Steps",
      "body": ""
    },
    {
      "key": "content:components:steps:13",
      "sectionId": "components",
      "headingId": "steps",
      "kind": "content",
      "title": "Steps",
      "body": "Do this. Then this."
    },
    {
      "key": "heading:components:cards:14",
      "sectionId": "components",
      "headingId": "cards",
      "kind": "heading",
      "title": "Cards",
      "body": ""
    },
    {
      "key": "content:components:cards:15",
      "sectionId": "components",
      "headingId": "cards",
      "kind": "content",
      "title": "Cards",
      "body": "Linked card Kicker Cards with href are clickable"
    },
    {
      "key": "content:components:cards:16",
      "sectionId": "components",
      "headingId": "cards",
      "kind": "content",
      "title": "Cards",
      "body": "Static card Kicker Cards without href are plain"
    },
    {
      "key": "heading:components:tables-and-status:17",
      "sectionId": "components",
      "headingId": "tables-and-status",
      "kind": "heading",
      "title": "Tables and status",
      "body": ""
    },
    {
      "key": "content:components:tables-and-status:18",
      "sectionId": "components",
      "headingId": "tables-and-status",
      "kind": "content",
      "title": "Tables and status",
      "body": "Search shipped"
    },
    {
      "key": "content:components:tables-and-status:19",
      "sectionId": "components",
      "headingId": "tables-and-status",
      "kind": "content",
      "title": "Tables and status",
      "body": "Versioning planned"
    }
  ],
  "concepts": [
    {
      "key": "heading:concepts:the-three-building-blocks:0",
      "sectionId": "concepts",
      "headingId": "the-three-building-blocks",
      "kind": "heading",
      "title": "The three building blocks",
      "body": ""
    },
    {
      "key": "content:concepts:the-three-building-blocks:1",
      "sectionId": "concepts",
      "headingId": "the-three-building-blocks",
      "kind": "content",
      "title": "The three building blocks",
      "body": "Everything in Acme is one of three things: a widget you write, a pipeline that transforms it, and a target it ships to. Once these click, the rest of the docs is detail."
    },
    {
      "key": "heading:concepts:widgets:2",
      "sectionId": "concepts",
      "headingId": "widgets",
      "kind": "heading",
      "title": "Widgets",
      "body": ""
    },
    {
      "key": "content:concepts:widgets:3",
      "sectionId": "concepts",
      "headingId": "widgets",
      "kind": "content",
      "title": "Widgets",
      "body": "A widget is a single entry file plus whatever it imports. Acme treats the entry file as the unit of build, test and deploy."
    },
    {
      "key": "content:concepts:widgets:4",
      "sectionId": "concepts",
      "headingId": "widgets",
      "kind": "content",
      "title": "Widgets",
      "body": "export default function widget(name: string) { return `Hello, ${name}!`; }"
    },
    {
      "key": "heading:concepts:pipelines:5",
      "sectionId": "concepts",
      "headingId": "pipelines",
      "kind": "heading",
      "title": "Pipelines",
      "body": ""
    },
    {
      "key": "content:concepts:pipelines:6",
      "sectionId": "concepts",
      "headingId": "pipelines",
      "kind": "content",
      "title": "Pipelines",
      "body": "A pipeline is an ordered list of steps. Each step receives the output of the one before it."
    },
    {
      "key": "content:concepts:pipelines:7",
      "sectionId": "concepts",
      "headingId": "pipelines",
      "kind": "content",
      "title": "Pipelines",
      "body": "compile Transpiles TypeScript to JavaScript on"
    },
    {
      "key": "content:concepts:pipelines:8",
      "sectionId": "concepts",
      "headingId": "pipelines",
      "kind": "content",
      "title": "Pipelines",
      "body": "minify Shrinks the output bundle on in build"
    },
    {
      "key": "content:concepts:pipelines:9",
      "sectionId": "concepts",
      "headingId": "pipelines",
      "kind": "content",
      "title": "Pipelines",
      "body": "test Runs your test files off"
    },
    {
      "key": "heading:concepts:targets:10",
      "sectionId": "concepts",
      "headingId": "targets",
      "kind": "heading",
      "title": "Targets",
      "body": ""
    },
    {
      "key": "content:concepts:targets:11",
      "sectionId": "concepts",
      "headingId": "targets",
      "kind": "content",
      "title": "Targets",
      "body": "A target is a named place to deploy: preview, staging, production, or anything you define. Targets live in acme.config.json."
    },
    {
      "key": "content:concepts:targets:12",
      "sectionId": "concepts",
      "headingId": "targets",
      "kind": "content",
      "title": "Targets",
      "body": "Targets never share state Deploying to preview cannot affect production. If you need shared secrets, set them per target."
    }
  ],
  "configuration": [
    {
      "key": "heading:configuration:the-config-file:0",
      "sectionId": "configuration",
      "headingId": "the-config-file",
      "kind": "heading",
      "title": "The config file",
      "body": ""
    },
    {
      "key": "content:configuration:the-config-file:1",
      "sectionId": "configuration",
      "headingId": "the-config-file",
      "kind": "content",
      "title": "The config file",
      "body": "All project settings live in acme.config.json at the project root. Every key is optional — Acme falls back to defaults for anything you leave out."
    },
    {
      "key": "content:configuration:the-config-file:2",
      "sectionId": "configuration",
      "headingId": "the-config-file",
      "kind": "content",
      "title": "The config file",
      "body": "{ \"entry\": \"src/widget.ts\", \"outDir\": \"dist\", \"pipeline\": [\"compile\", \"minify\"], \"targets\": { \"preview\": { \"url\": \"https://preview.example.com\" } } }"
    },
    {
      "key": "heading:configuration:options:3",
      "sectionId": "configuration",
      "headingId": "options",
      "kind": "heading",
      "title": "Options",
      "body": ""
    },
    {
      "key": "content:configuration:options:4",
      "sectionId": "configuration",
      "headingId": "options",
      "kind": "content",
      "title": "Options",
      "body": "entry string src/widget.ts The widget's entry file"
    },
    {
      "key": "content:configuration:options:5",
      "sectionId": "configuration",
      "headingId": "options",
      "kind": "content",
      "title": "Options",
      "body": "outDir string dist Where builds are written"
    },
    {
      "key": "content:configuration:options:6",
      "sectionId": "configuration",
      "headingId": "options",
      "kind": "content",
      "title": "Options",
      "body": "pipeline string[] [\"compile\", \"minify\"] Steps run on every build"
    },
    {
      "key": "content:configuration:options:7",
      "sectionId": "configuration",
      "headingId": "options",
      "kind": "content",
      "title": "Options",
      "body": "targets object {} Named deploy destinations"
    },
    {
      "key": "heading:configuration:environment-overrides:8",
      "sectionId": "configuration",
      "headingId": "environment-overrides",
      "kind": "heading",
      "title": "Environment overrides",
      "body": ""
    },
    {
      "key": "content:configuration:environment-overrides:9",
      "sectionId": "configuration",
      "headingId": "environment-overrides",
      "kind": "content",
      "title": "Environment overrides",
      "body": "Any key can be overridden with an environment variable prefixed ACME_:"
    },
    {
      "key": "content:configuration:environment-overrides:10",
      "sectionId": "configuration",
      "headingId": "environment-overrides",
      "kind": "content",
      "title": "Environment overrides",
      "body": "ACME_OUT_DIR=build acme build"
    },
    {
      "key": "content:configuration:environment-overrides:11",
      "sectionId": "configuration",
      "headingId": "environment-overrides",
      "kind": "content",
      "title": "Environment overrides",
      "body": "Environment wins When a key is set in both the file and the environment, the environment value is used."
    }
  ],
  "intro": [
    {
      "key": "heading:intro:what-acme-is:0",
      "sectionId": "intro",
      "headingId": "what-acme-is",
      "kind": "heading",
      "title": "What Acme is",
      "body": ""
    },
    {
      "key": "content:intro:what-acme-is:1",
      "sectionId": "intro",
      "headingId": "what-acme-is",
      "kind": "content",
      "title": "What Acme is",
      "body": "Acme is a small, open-source toolkit for building, testing and shipping widgets. It gives you one config file, one CLI and a predictable pipeline from source to deploy — so you spend your time on the widget, not the plumbing around it."
    },
    {
      "key": "content:intro:what-acme-is:2",
      "sectionId": "intro",
      "headingId": "what-acme-is",
      "kind": "content",
      "title": "What Acme is",
      "body": "Open source MIT Node 20+"
    },
    {
      "key": "content:intro:what-acme-is:3",
      "sectionId": "intro",
      "headingId": "what-acme-is",
      "kind": "content",
      "title": "What Acme is",
      "body": "This is placeholder content Acme is a fictional product. Every page here exists to show how the OpenDocera docs template looks and behaves. Replace this folder with your own pages — see Components for everything you can use."
    },
    {
      "key": "heading:intro:why-it-exists:4",
      "sectionId": "intro",
      "headingId": "why-it-exists",
      "kind": "heading",
      "title": "Why it exists",
      "body": ""
    },
    {
      "key": "content:intro:why-it-exists:5",
      "sectionId": "intro",
      "headingId": "why-it-exists",
      "kind": "content",
      "title": "Why it exists",
      "body": "Most widget projects start the same way: copy an old repo, delete half of it, and fight the build for an afternoon. Acme replaces that with a single acme init and sensible defaults you can override one key at a time."
    },
    {
      "key": "heading:intro:who-its-for:6",
      "sectionId": "intro",
      "headingId": "who-its-for",
      "kind": "heading",
      "title": "Who it's for",
      "body": ""
    },
    {
      "key": "content:intro:who-its-for:7",
      "sectionId": "intro",
      "headingId": "who-its-for",
      "kind": "content",
      "title": "Who it's for",
      "body": "Developers who want a working project in minutes, not hours."
    },
    {
      "key": "content:intro:who-its-for:8",
      "sectionId": "intro",
      "headingId": "who-its-for",
      "kind": "content",
      "title": "Who it's for",
      "body": "Teams that need the same build and deploy steps on every machine."
    },
    {
      "key": "content:intro:who-its-for:9",
      "sectionId": "intro",
      "headingId": "who-its-for",
      "kind": "content",
      "title": "Who it's for",
      "body": "Maintainers who want config changes to be reviewable in one file."
    },
    {
      "key": "heading:intro:how-these-docs-are-organized:10",
      "sectionId": "intro",
      "headingId": "how-these-docs-are-organized",
      "kind": "heading",
      "title": "How these docs are organized",
      "body": ""
    },
    {
      "key": "content:intro:how-these-docs-are-organized:11",
      "sectionId": "intro",
      "headingId": "how-these-docs-are-organized",
      "kind": "content",
      "title": "How these docs are organized",
      "body": "Quickstart Get started Install and ship your first widget"
    },
    {
      "key": "content:intro:how-these-docs-are-organized:12",
      "sectionId": "intro",
      "headingId": "how-these-docs-are-organized",
      "kind": "content",
      "title": "How these docs are organized",
      "body": "Core concepts Get started Widgets, pipelines and targets"
    },
    {
      "key": "content:intro:how-these-docs-are-organized:13",
      "sectionId": "intro",
      "headingId": "how-these-docs-are-organized",
      "kind": "content",
      "title": "How these docs are organized",
      "body": "Configuration Guides Every option in acme.config.json"
    },
    {
      "key": "content:intro:how-these-docs-are-organized:14",
      "sectionId": "intro",
      "headingId": "how-these-docs-are-organized",
      "kind": "content",
      "title": "How these docs are organized",
      "body": "CLI Reference Commands, flags and exit codes"
    }
  ],
  "quickstart": [
    {
      "key": "heading:quickstart:install-acme:0",
      "sectionId": "quickstart",
      "headingId": "install-acme",
      "kind": "heading",
      "title": "Install Acme",
      "body": ""
    },
    {
      "key": "content:quickstart:install-acme:1",
      "sectionId": "quickstart",
      "headingId": "install-acme",
      "kind": "content",
      "title": "Install Acme",
      "body": "This page takes you from an empty folder to a deployed widget. You need Node.js 20 or later and a terminal — nothing else."
    },
    {
      "key": "content:quickstart:install-acme:2",
      "sectionId": "quickstart",
      "headingId": "install-acme",
      "kind": "content",
      "title": "Install Acme",
      "body": "~5 minutes Node 20+ npm · pnpm · yarn"
    },
    {
      "key": "heading:quickstart:prerequisites:3",
      "sectionId": "quickstart",
      "headingId": "prerequisites",
      "kind": "heading",
      "title": "Prerequisites",
      "body": ""
    },
    {
      "key": "content:quickstart:prerequisites:4",
      "sectionId": "quickstart",
      "headingId": "prerequisites",
      "kind": "content",
      "title": "Prerequisites",
      "body": "Node.js 20+ Required Check with node --version"
    },
    {
      "key": "content:quickstart:prerequisites:5",
      "sectionId": "quickstart",
      "headingId": "prerequisites",
      "kind": "content",
      "title": "Prerequisites",
      "body": "Git Recommended Acme initializes a repo for you if it finds git"
    },
    {
      "key": "heading:quickstart:create-a-project:6",
      "sectionId": "quickstart",
      "headingId": "create-a-project",
      "kind": "heading",
      "title": "Create a project",
      "body": ""
    },
    {
      "key": "content:quickstart:create-a-project:7",
      "sectionId": "quickstart",
      "headingId": "create-a-project",
      "kind": "content",
      "title": "Create a project",
      "body": "npm create acme@latest my-widget cd my-widget npm run dev"
    },
    {
      "key": "content:quickstart:create-a-project:8",
      "sectionId": "quickstart",
      "headingId": "create-a-project",
      "kind": "content",
      "title": "Create a project",
      "body": "pnpm create acme my-widget cd my-widget pnpm dev"
    },
    {
      "key": "content:quickstart:create-a-project:9",
      "sectionId": "quickstart",
      "headingId": "create-a-project",
      "kind": "content",
      "title": "Create a project",
      "body": "yarn create acme my-widget cd my-widget yarn dev"
    },
    {
      "key": "content:quickstart:create-a-project:10",
      "sectionId": "quickstart",
      "headingId": "create-a-project",
      "kind": "content",
      "title": "Create a project",
      "body": "Windows tip Keep the project at a short path such as C:\\dev\\my-widget to avoid path-length limits in older tools."
    },
    {
      "key": "heading:quickstart:ship-your-first-widget:11",
      "sectionId": "quickstart",
      "headingId": "ship-your-first-widget",
      "kind": "heading",
      "title": "Ship your first widget",
      "body": ""
    },
    {
      "key": "content:quickstart:ship-your-first-widget:12",
      "sectionId": "quickstart",
      "headingId": "ship-your-first-widget",
      "kind": "content",
      "title": "Ship your first widget",
      "body": "Open the dev server Visit http://localhost:4000. The page reloads every time you save a file in src/."
    },
    {
      "key": "content:quickstart:ship-your-first-widget:13",
      "sectionId": "quickstart",
      "headingId": "ship-your-first-widget",
      "kind": "content",
      "title": "Ship your first widget",
      "body": "Edit the widget Open src/widget.ts and change the greeting. The preview updates instantly."
    },
    {
      "key": "content:quickstart:ship-your-first-widget:14",
      "sectionId": "quickstart",
      "headingId": "ship-your-first-widget",
      "kind": "content",
      "title": "Ship your first widget",
      "body": "Build it Run acme build. Output lands in dist/, ready to deploy."
    },
    {
      "key": "content:quickstart:ship-your-first-widget:15",
      "sectionId": "quickstart",
      "headingId": "ship-your-first-widget",
      "kind": "content",
      "title": "Ship your first widget",
      "body": "Deploy Run acme deploy --target preview to get a shareable URL. See Configuration to add your own targets."
    },
    {
      "key": "heading:quickstart:default-ports:16",
      "sectionId": "quickstart",
      "headingId": "default-ports",
      "kind": "heading",
      "title": "Default ports",
      "body": ""
    },
    {
      "key": "content:quickstart:default-ports:17",
      "sectionId": "quickstart",
      "headingId": "default-ports",
      "kind": "content",
      "title": "Default ports",
      "body": "Dev server http://localhost:4000"
    },
    {
      "key": "content:quickstart:default-ports:18",
      "sectionId": "quickstart",
      "headingId": "default-ports",
      "kind": "content",
      "title": "Default ports",
      "body": "Inspector http://localhost:4001"
    }
  ],
  "theming": [
    {
      "key": "heading:theming:theme-tokens:0",
      "sectionId": "theming",
      "headingId": "theme-tokens",
      "kind": "heading",
      "title": "Theme tokens",
      "body": ""
    },
    {
      "key": "content:theming:theme-tokens:1",
      "sectionId": "theming",
      "headingId": "theme-tokens",
      "kind": "content",
      "title": "Theme tokens",
      "body": "Acme widgets read their colors, fonts and spacing from a small set of tokens. Change a token once and every widget picks it up."
    },
    {
      "key": "content:theming:theme-tokens:2",
      "sectionId": "theming",
      "headingId": "theme-tokens",
      "kind": "content",
      "title": "Theme tokens",
      "body": "CSS variables Light & dark No rebuild"
    },
    {
      "key": "heading:theming:built-in-tokens:3",
      "sectionId": "theming",
      "headingId": "built-in-tokens",
      "kind": "heading",
      "title": "Built-in tokens",
      "body": ""
    },
    {
      "key": "content:theming:built-in-tokens:4",
      "sectionId": "theming",
      "headingId": "built-in-tokens",
      "kind": "content",
      "title": "Built-in tokens",
      "body": "--acme-bg #ffffff #0b0d12"
    },
    {
      "key": "content:theming:built-in-tokens:5",
      "sectionId": "theming",
      "headingId": "built-in-tokens",
      "kind": "content",
      "title": "Built-in tokens",
      "body": "--acme-fg #111318 #e7e9ee"
    },
    {
      "key": "content:theming:built-in-tokens:6",
      "sectionId": "theming",
      "headingId": "built-in-tokens",
      "kind": "content",
      "title": "Built-in tokens",
      "body": "--acme-accent #1e4fd8 #6b95ff"
    },
    {
      "key": "heading:theming:overriding-tokens:7",
      "sectionId": "theming",
      "headingId": "overriding-tokens",
      "kind": "heading",
      "title": "Overriding tokens",
      "body": ""
    },
    {
      "key": "content:theming:overriding-tokens:8",
      "sectionId": "theming",
      "headingId": "overriding-tokens",
      "kind": "content",
      "title": "Overriding tokens",
      "body": ":root { --acme-accent: #d81e5b; }"
    },
    {
      "key": "content:theming:overriding-tokens:9",
      "sectionId": "theming",
      "headingId": "overriding-tokens",
      "kind": "content",
      "title": "Overriding tokens",
      "body": "{ \"theme\": { \"accent\": \"#d81e5b\" } }"
    },
    {
      "key": "heading:theming:dark-mode:10",
      "sectionId": "theming",
      "headingId": "dark-mode",
      "kind": "heading",
      "title": "Dark mode",
      "body": ""
    },
    {
      "key": "content:theming:dark-mode:11",
      "sectionId": "theming",
      "headingId": "dark-mode",
      "kind": "content",
      "title": "Dark mode",
      "body": "Dark values apply automatically when the user's system prefers dark. To force a theme, set \"theme\": { \"mode\": \"dark\" }."
    }
  ]
};
