import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { techStack } from "#constants";
import { Check, Flag } from "lucide-react";
import { WindowControls } from "#components";

const Terminal = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="terminal"/>
        <h2>Tech Stack</h2>
      </div>

      <div className="techstack flex flex-col">
        <p>
          <span className="font-bold">@Alfath's %</span>
          show tech stack
        </p>

        <div className="label">
          <p className="w-32">Category</p>
          <p>Technologies</p>
        </div>

        {/* CONTENT */}
        <ul className="content space-y-3">
          {techStack.map(({ category, items }) => (
            <li key={category} className="flex items-start gap-3">
              <Check size={18} className="mt-1 check" />

              <div>
                <h3 className="font-semibold">{category}</h3>

                <ul className="flex flex-wrap gap-1">
                  {items.map((item, i) => (
                    <li key={i}>
                      {item}
                      {i < items.length - 1 && ","}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        {/* FOOTNOTE */}
        <div className="footnote mt-4 pt-2 border-t border-dashed text-sm">
          <p className="flex items-center gap-2">
            <Check size={14} />
            {techStack.length} of {techStack.length} stack loaded successfully (100%)
          </p>

          <p className="flex items-center gap-2">
            <Flag size={14} />
            Render time: 6ms
          </p>
        </div>
      </div>
    </>
  );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;
