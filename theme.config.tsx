import Logo from '@components/Logo';
import { useRouter } from 'next/router';
import type { DocsThemeConfig } from 'nextra-theme-docs';
import { useConfig } from 'nextra-theme-docs';
import favicon16 from './public/favicon-16x16.png';
import favicon32 from './public/favicon-32x32.png';
import appleTouchIcon from './public/apple-touch-icon.png';
import Help from '@components/features/help';
import dynamic from 'next/dynamic';

const ChatWidget = dynamic(() => import('./components/chatWidget/ChatWidget'), {
  ssr: false,
});

const logo = (
  <span>
    <Logo />
    <style jsx>{`
      span {
        padding: 0.5rem 0.5rem 0.5rem 0;
        mask-image: linear-gradient(60deg, black 25%, rgba(0, 0, 0, 0.2) 50%, black 75%);
        mask-size: 400%;
        mask-position: 0%;
      }
      span:hover {
        mask-position: 100%;
        transition:
          mask-position 1s ease,
          -webkit-mask-position 1s ease;
      }
    `}</style>
  </span>
);

const socialImage = 'https://docs.buildship.com/og.png';

const defaultDescription =
  'A unified resource to start building your backend with low-code. Dive into triggers, nodes, and step-by-step guidance to jumpstart your workflow creation.';

const pageDescriptions: Record<string, string> = {
  '/': 'Build APIs, scheduled jobs, chatbots, and backend workflows with BuildShip. Paid plans are Starter, Pro, Business, and Enterprise.',
  '/tutorials':
    'Step-by-step BuildShip tutorials for Firebase, Supabase, storage, search, and other backend workflows.',
  '/workflows': 'Learn the BuildShip workflow canvas, including inputs, outputs, triggers, testing, and shipping.',
  '/nodes': 'Nodes are the building blocks of a BuildShip workflow. Learn inputs, outputs, and logic nodes.',
  '/triggers':
    'Triggers start a BuildShip workflow from an API call, a schedule, a database change, or an external event.',
  '/ai-nodes': 'Generate custom BuildShip nodes with AI, or start from pre-built nodes in the Nodeverse.',
  '/utility-nodes': 'Pre-built BuildShip utility nodes for scraping, data tasks, and other common workflow steps.',
  '/keyless': 'Use BuildShip keyless nodes for AI models with credits, or connect your own API keys.',
  '/readme':
    'Add a readme page in a folder to document a BuildShip workflow. Readme pages are included when you remix.',
  '/sticky-notes': 'Leave sticky notes on the BuildShip canvas to document a workflow for yourself and your team.',
  '/node-failure': 'Choose how a BuildShip node behaves when its logic fails.',
  '/skip': 'Skip a node in a BuildShip workflow during testing and when the workflow is shipped.',
  '/rename-node': 'Rename a node in a BuildShip workflow so later steps and your team can tell it apart.',
  '/reordering-nodes': 'Reorder nodes on the BuildShip canvas to change how a workflow reads and runs.',
  '/rename': 'Rename a BuildShip workflow so it is easy to find in your project.',
  '/copy-paste': 'Copy BuildShip nodes and workflows and paste them into the same project or another one.',
  '/api-spec': 'Export or import an OpenAPI specification for a BuildShip workflow.',
  '/ownership-transfer': 'Transfer ownership of a BuildShip workspace to another member.',
  '/tools': 'Build portable MCP tools for AI agents in BuildShip. MCP means Model Context Protocol.',
  '/tools/claude': 'Connect BuildShip tools to Claude Desktop with the Model Context Protocol (MCP).',
  '/tools/elevenlabs': 'Add a BuildShip workflow as a custom tool for an ElevenLabs voice agent.',
  '/env-var': 'Store configuration in BuildShip environment variables and read them from workflow nodes.',
  '/buildship-tables': 'Use BuildShip Tables to view and edit the Firestore database that comes with your project.',
  '/secrets': 'Store API keys and other secrets in Google Cloud Secret Manager for your BuildShip project.',
  '/logging': 'Read BuildShip workflow logs to trace a run, inspect values, and see how long each node took.',
  '/testing': 'Test a BuildShip node in the editor before you ship the whole workflow.',
  '/unit-testing': 'Write unit tests for BuildShip node logic so you can check behavior before you ship.',
  '/testing-examples': 'Save test inputs in BuildShip and reuse them for node and workflow tests.',
  '/version-control': 'Review shipped versions of a BuildShip workflow and compare what changed.',
  '/remix': 'Share a BuildShip workflow with a remix link so someone else can clone it into their account.',
  '/using-templates': 'Clone a BuildShip template and adapt the workflow to your project.',
  '/tools-templates': 'Find community tools and templates, then remix them into your BuildShip project.',
  '/community-nodes': 'Build and share community nodes that other BuildShip users can add to their workflows.',
  '/creating-nodes': 'Checklist for creating a BuildShip node, from the script to the inputs people see.',
  '/create-triggers': 'How to add a trigger to BuildShip, including API keys, OAuth, and scheduled triggers.',
  '/file-handling': 'Convert, save, and read files inside a BuildShip workflow.',
  '/in-app-support': 'Send a support request from inside BuildShip when you need help with a workflow.',
  '/subscriptions-billing':
    'Manage your BuildShip subscription in Stripe, download invoices and receipts, and start the 7-day Starter trial (a card is required).',
  '/triggers-rest-api/rest-api': 'Start a BuildShip workflow by sending an HTTP request to its endpoint.',
  '/triggers-rest-api/file-upload': 'Accept a multipart file upload and start a BuildShip workflow.',
  '/triggers-rest-api/firebase-auth': 'Start a BuildShip workflow from a request that includes a Firebase auth token.',
  '/triggers-rest-api/firebase-file-upload': 'Accept an authenticated file upload and start a BuildShip workflow.',
  '/triggers-scheduled/scheduled-cron': 'Run a BuildShip workflow on a cron schedule.',
  '/triggers-scheduled/scheduled-interval': 'Run a BuildShip workflow on a repeating interval.',
  '/triggers-database/rowy-trigger':
    'Start a BuildShip workflow when a Firestore document is created, updated, or deleted, using the Rowy Trigger.',
  '/triggers-database/supabase-trigger': 'Start a BuildShip workflow from a Supabase database webhook.',
  '/triggers-database/mongodb-trigger': 'Start a BuildShip workflow when a MongoDB collection changes.',
  '/triggers-payments/stripe': 'Start a BuildShip workflow from Stripe webhook events.',
  '/triggers-payments/lemon-squeezy': 'Start a BuildShip workflow from Lemon Squeezy payment events.',
  '/triggers-payments/revenue-cat': 'Start a BuildShip workflow from RevenueCat subscription webhooks.',
  '/triggers-bots/telegram-bot': 'Start a BuildShip workflow from incoming Telegram bot messages.',
  '/triggers-bots/whatsapp-bot': 'Start a BuildShip workflow from WhatsApp messages via the WhatsApp Business API.',
  '/triggers-bots/chatbot': 'Connect the BuildShip Chat Widget to a workflow and test it in the widget simulator.',
  '/triggers-integrations/email-trigger': 'Start a BuildShip workflow when an email arrives at the trigger address.',
  '/triggers-integrations/github-trigger': 'Start a BuildShip workflow from GitHub repository webhook events.',
  '/triggers-integrations/notion-trigger': 'Start a BuildShip workflow from a button in a Notion page.',
  '/triggers-integrations/webflow-trigger': 'Start a BuildShip workflow from Webflow form, CMS, and site events.',
  '/triggers-integrations/youtube-trigger': 'Start a BuildShip workflow when a YouTube channel publishes a new video.',
  '/triggers-integrations/buildship-trigger': 'Call one BuildShip workflow from another workflow.',
  '/ai-assistant/assistant': 'Build an AI assistant in BuildShip and call it from your own app.',
  '/ai-assistant/openai-assistant': 'Use the OpenAI Assistant API inside a BuildShip workflow.',
  '/database/firebase': 'Read and write your own Firebase project from a BuildShip workflow.',
  '/database/firestore-nodes': 'Firestore nodes in BuildShip for creating, querying, and deleting documents.',
  '/database/supabase': 'Connect a Supabase database and build APIs and workflows on it with BuildShip.',
  '/database/mongodb': 'Build workflows, APIs, and scheduled jobs on MongoDB with BuildShip.',
  '/payment/stripe': 'Call Stripe APIs from a BuildShip workflow without writing the integration by hand.',
  '/connect-with/flutterflow': 'Use BuildShip as the backend for a FlutterFlow app.',
  '/connect-with/webflow': 'Use BuildShip as the backend for a Webflow site.',
  '/connect-with/bubble': 'Use BuildShip together with a Bubble app.',
  '/connect-with/framer': 'Use BuildShip together with Framer.',
  '/connect-with/nextjs': 'Use BuildShip as the backend for a Next.js app.',
  '/core-nodes/http': 'Send HTTP requests from a BuildShip workflow with the HTTP node.',
  '/core-nodes/script': 'Write custom logic in a BuildShip workflow with the script node.',
  '/messaging/whatsapp': 'Send WhatsApp messages from a BuildShip workflow.',
  '/utility-nodes/scrape-web-url': 'Scrape text from a web page in a BuildShip workflow.',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://buildship.com/#organization',
      name: 'BuildShip',
      url: 'https://buildship.com',
      logo: 'https://docs.buildship.com/android-chrome-512x512.png',
      sameAs: ['https://twitter.com/BuildShipApp', 'https://buildship.com/discord', 'https://github.com/buildship-ai'],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://docs.buildship.com/#website',
      name: 'BuildShip Documentation',
      url: 'https://docs.buildship.com',
      description:
        'Documentation for BuildShip, a visual backend builder for APIs, scheduled jobs, chatbots, and workflow automation.',
      publisher: { '@id': 'https://buildship.com/#organization' },
    },
    {
      '@type': 'SoftwareApplication',
      name: 'BuildShip',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web',
      url: 'https://buildship.com',
      description:
        'BuildShip is a visual backend builder for shipping APIs, scheduled jobs, chatbots, and workflow automations.',
    },
  ],
};

function normalizeDocsPath(asPath: string) {
  const path = asPath.split('?')[0].split('#')[0];
  if (path.length > 1 && path.endsWith('/')) return path.slice(0, -1);
  return path || '/';
}

function resolveDescription(asPath: string, frontMatter?: { description?: unknown }) {
  const raw = frontMatter?.description;
  const fromFrontMatter = typeof raw === 'string' ? raw.replace(/\s+/g, ' ').trim() : '';
  if (fromFrontMatter) return fromFrontMatter;
  return pageDescriptions[normalizeDocsPath(asPath)] || defaultDescription;
}

const config: DocsThemeConfig = {
  project: {
    link: 'https://buildship.com/github', // Link to the GitHub repo
  },
  chat: {
    link: 'https://buildship.com/discord', // Link to the Rowy Discord server
  },
  docsRepositoryBase: 'https://github.com/buildship-ai/buildship-docs/blob/main',
  navbar: {
    extraContent: (
      <>
        <a
          style={{ padding: '0.5rem' }}
          target='_blank'
          href='https://twitter.com/BuildShipApp'
          aria-label='BuildShip Twitter'
          rel='nofollow noreferrer'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='currentColor'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='feather feather-twitter'
          >
            <path d='M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z' />
          </svg>
        </a>
      </>
    ),
  },
  useNextSeoProps() {
    const { asPath } = useRouter();
    const { frontMatter } = useConfig();
    const description = resolveDescription(asPath, frontMatter);
    if (asPath !== '/') {
      return {
        titleTemplate: '%s – BuildShip',
        description,
      };
    }
    return { description };
  },
  logo,
  head: function useHead() {
    const { title, frontMatter } = useConfig();
    const { asPath } = useRouter();
    const description = resolveDescription(asPath, frontMatter);
    const canonical = new URL(asPath.split('#')[0], 'https://docs.buildship.com').toString();
    const ogTitle = frontMatter.title
      ? frontMatter.title + ' – BuildShip Docs'
      : title
      ? title + ' – BuildShip Docs'
      : 'BuildShip Documentation';

    return (
      <>
        <meta name='msapplication-TileColor' content='#fff' />
        <meta name='theme-color' content='#fff' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta httpEquiv='Content-Language' content='en' />
        <meta name='description' content={description} />
        <link rel='canonical' href={canonical} />

        {/* Twitter */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:image' content={socialImage} />
        <meta name='twitter:site' content='@BuildShipApp' />
        <meta name='twitter:url' content={canonical} />
        <meta property='twitter:title' content={title || 'BuildShip Documentation'} />
        <meta property='twitter:description' content={description} />

        {/* Open Graph */}
        <meta property='og:title' content={ogTitle} />
        <meta property='og:url' content={canonical} />
        <meta property='og:type' content='website' />
        <meta property='og:description' content={description} />
        <meta property='og:image' content={socialImage} />

        <meta name='apple-mobile-web-app-title' content='BuildShip' />
        <link rel='apple-touch-icon' sizes='180x180' href={appleTouchIcon.src}></link>
        <link rel='icon' type='image/png' sizes='32x32' href={favicon32.src}></link>
        <link rel='icon' type='image/png' sizes='16x16' href={favicon16.src}></link>
        <link rel='manifest' href='/site.webmanifest'></link>
        <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </>
    );
  },
  feedback: {
    content: 'Question? Give us feedback →',
    labels: 'feedback',
    useLink: () => 'https://buildship.com/discord',
  },
  editLink: {
    text: 'Edit this page on GitHub ↗',
  },
  sidebar: {
    titleComponent({ title, type }) {
      if (type === 'separator') {
        return <span className='cursor-default'>{title}</span>;
      }
      return <>{title}</>;
    },
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  main: function useMain({ children }) {
    return (
      <>
        {children}
        <Help />
      </>
    );
  },
  navigation: { prev: false, next: false },
  footer: { component: <ChatWidget /> },
  gitTimestamp: null,
};

export default config;
