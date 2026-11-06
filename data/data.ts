import type { TargetAndTransition, Transition, Variants } from "framer-motion";
import raw from "./data.json";
import type { IconName } from "@/lib/icons";

/**
 * All site content lives in data/data.json (ArqivoInterior -> fonts, templateComponents, sections -> variants).
 * Edit that file to change the site; this is the only ts file that reads it.
 */
const arqivo = raw.ArqivoInterior;
const s = arqivo.sections;
export const fonts = arqivo.fonts;
export const googleFontsHref = arqivo.fonts.googleFontsHref;
export const rootVars = {
  ...arqivo.fonts.fontVars,
  "--header-h": arqivo.layout.headerHeight,
  "--side": arqivo.layout.side,
  "--section-y": arqivo.layout.sectionY,
} as React.CSSProperties;
export const templateComponents = arqivo.templateComponents;
export const LAYOUT = arqivo.layout;
/** Tailwind class strings measured from the design mockups (1349px wide), see data.json -> typography. */
export const TYPE = arqivo.typography;
export const sections = s;

const header = s.SiteChrome.variants.ArqivoHeader1;
const footer = s.SiteChrome.variants.ArqivoFooter1;
const motion = s.Motion.variants.ArqivoMotion1;

type Brand = {
  name: string;
  tagline: string;
  phone: string;
  email: string;
  enquiryEmail: string;
  address: string;
};
type NavLink = { label: string; href: string };
type Heading = { eyebrow: string; title: string; accent: string; text?: string };
type Button = { label: string; href: string };

export const BRAND: Brand = header.brand;
export const NAV_LINKS: NavLink[] = header.navLinks;
export const IMG: Record<keyof typeof s.Media.variants.ArqivoImages1.images, string> = s.Media.variants.ArqivoImages1.images;

export type Highlight = { label: string; icon: IconName };

export type Project = {
  slug: string;
  no: string;
  title: string;
  category: string;
  image: string;
  hero: string;
  type: string;
  location: string;
  area: string;
  style: string;
  completed: string;
  overview: string;
  highlights: Highlight[];
};

export type PostPoint = { title: string; text: string };

export type Post = {
  slug: string;
  category: string;
  title: string;
  date: string;
  image: string;
  hero: string;
  excerpt: string;
  headline: [string, string];
  intro: string;
  keyTitle: string;
  points: PostPoint[];
  quote: string;
  conclusion: string;
};

export type Testimonial = { name: string; role: string; quote: string; avatar?: string };
export type Service = { title: string; text: string; icon: IconName };

export const PROJECTS = s.Projects.variants.ArqivoProjects1.projects as Project[];
export const POSTS = s.Blog.variants.ArqivoBlog1.posts as Post[];
export const TESTIMONIALS: Testimonial[] = s.Testimonials.variants.ArqivoTestimonials1.testimonials;

export const getProject = (slug: string) => PROJECTS.find((project) => project.slug === slug);
export const getPost = (slug: string) => POSTS.find((post) => post.slug === slug);

// Page copy, one variant per page/section
export type HomeContent = {
  metadata: { title: string; description: string };
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    image: keyof typeof IMG;
    imageAlt: string;
  };
  about: {
    eyebrow: string;
    title: string;
    accent: string;
    paragraphs: string[];
    extraParagraph: string;
    button: Button;
    image: keyof typeof IMG;
    imageAlt: string;
  };
  services: {
    eyebrow: string;
    title: string;
    accent: string;
    text: string;
    button: Button;
    image: keyof typeof IMG;
    imageAlt: string;
    items: Service[];
  };
  projectsSection: Required<Heading>;
  blogSection: Required<Heading> & { button: Button };
};

export const homeContent = s.Home.variants.ArqivoHome1 as HomeContent;

export const aboutContent = s.About.variants.ArqivoAbout1 as {
  metadata: { title: string; description: string };
  hero: { title: string };
  purpose: Required<Heading> & {
    image: keyof typeof IMG;
    imageAlt: string;
    pillars: { title: string; text: string; icon: IconName }[];
  };
};

export const servicesContent = s.Services.variants.ArqivoServices1;
export const projectsContent = s.Projects.variants.ArqivoProjects1;
export const testimonialsContent = s.Testimonials.variants.ArqivoTestimonials1;
export const blogContent = s.Blog.variants.ArqivoBlog1;
type EnquireJson = typeof s.Enquire.variants.ArqivoEnquire1;
export const enquireContent = s.Enquire.variants.ArqivoEnquire1 as Omit<EnquireJson, "image"> & {
  image: keyof typeof IMG;
};
type ContactJson = typeof s.Contact.variants.ArqivoContact1;
export const contactContent = s.Contact.variants.ArqivoContact1 as Omit<ContactJson, "areas"> & {
  areas: { icon: IconName; title: string; text: string }[];
};
export const miscContent = s.Misc.variants.ArqivoMisc1;

export const sharedContent = {
  site: header.site,
  navbar: header.navbar,
  footer: footer.footer,
};

export type MotionConfig = {
  ease: [number, number, number, number];
  duration: number;
  reveal: Record<"up" | "left" | "right" | "zoom" | "fade", Variants>;
  stagger: { container: Variants; item: Variants };
  word: { container: Variants; item: Variants };
  clip: Variants;
  page: { initial: TargetAndTransition; animate: TargetAndTransition; transition: Transition };
  preloader: { duration: number; storageKey: string };
};

export const MOTION = motion.motion as unknown as MotionConfig;

export default raw;
