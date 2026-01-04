import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { blogPosts } from "#constants";
import {
  ChevronLeft,
  ChevronRight,
  PanelLeft,
  ShieldHalf,
  Search,
  Share,
  Plus,
  Copy,
} from "lucide-react";
import { MoveRight } from "lucide-react";

const Safari = () => {
  return (
    <>
      <div id="window-header" className="flex items-center gap-3 px-3">
        <WindowControls target="safari" />

        <PanelLeft className="ml-4 icon" />

        <div className="flex items-center gap-1 ml-3">
          <ChevronLeft className="icon" />
          <ChevronRight className="icon" />
        </div>

        <div className="flex-1 flex items-center gap-3">
          <ShieldHalf className="icon" />

          <div className="search flex items-center gap-2 px-3 py-1 rounded-md">
            <Search className="icon" />
            <input
              type="text"
              placeholder="Search or enter website name"
              className="flex-1 bg-transparent outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Share className="icon" />
          <Plus className="icon" />
          <Copy className="icon" />
        </div>
      </div>

      <div className="blog">
        <h2>My Developer Blog</h2>

        <div className="space-y-8">
          {blogPosts.map(({ id, image, title, date, link }) => (
  <div
    key={id}
    className="blog-posts flex items-start gap-4"
  >
    <img
      src={image}
      alt={title}
      className="w-24 h-24 object-contain"
    />

    <div className="content space-y-1">
      <p className="text-sm text-gray-400">{date}</p>
      <p className="font-medium">{title}</p>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-blue-500 hover:underline"
      >
        check out the full post
        <MoveRight className="w-4 h-4 icon-hover" />
      </a>
    </div>
  </div>
))}

        </div>
      </div>
    </>
  );
};

const SafariWindow = WindowWrapper(Safari, "safari");
export default SafariWindow;
