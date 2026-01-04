import { socials } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { asset } from "#utils/asset";


const Contact = ({ closeSelf }) => {
  return (
    <>
      {/* HEADER KHUSUS CONTACT */}
      <div
        id="window-header"
        className="
          h-10 px-3
          flex items-center gap-2
          bg-gray-100 border-b
          cursor-move select-none
        "
      >
        {/* Close button */}
        <button
          onClick={closeSelf}
          className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600"
          title="Close"
        />
        <span className="ml-2 text-sm font-medium text-gray-700">
          Contact
        </span>
      </div>

      {/* BODY */}
      <div className="p-5 space-y-5 flex flex-col items-center text-center">
        <img
  src={asset("images/alfath.jpg")}
  alt="Adrian"
  className="w-24 h-24 rounded-full object-cover"
/>


        <h3 className="text-lg font-semibold">Hayyu kadie</h3>
        <p className="text-sm opacity-80">Got an idea?</p>

        {/* SOCIAL ICONS HORIZONTAL */}
        <ul className="flex flex-row gap-4 justify-center flex-wrap">
          {socials.map(({ id, bg, link, icon, text }) => (
            <li
              key={id}
              style={{ backgroundColor: bg }}
              className="
                rounded-full
                p-3
                hover:opacity-90
                transition
              "
              title={text}
            >
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <img
                  src={icon}
                  alt={text}
                  className="w-5 h-5"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const ContactWindow = WindowWrapper(Contact, "contact");
export default ContactWindow;
