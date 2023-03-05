import React from "react";
import type { RouterOutputs } from "~/utils/api";

interface MenuViewProps {
  menu: NonNullable<
    NonNullable<RouterOutputs["restaurants"]["getById"]>["menu"]
  >;
}

export const MenuView: React.FC<MenuViewProps> = ({ menu }) => {
  return (
    <div className="my-8 sm:my-12">
      <h2 className="mb-4 text-2xl font-bold">Menu</h2>

      <div className="space-y-5">
        {menu.sections.map((section) => (
          <div key={section.name}>
            <div className="mb-2 flex items-center gap-2 border-b sm:mb-3">
              <h3 className="text-xl font-bold">{section.name}</h3>
              <p className="text-sm">({section.items.length} items)</p>
            </div>

            <div className="grid gap-y-4 gap-x-10 sm:grid-cols-2">
              {section.items.map((item) => (
                <div key={item.name} className="">
                  <div className="mb-1 flex justify-between gap-3 italic">
                    <h4 className="font-semibold leading-5">{item.name}</h4>
                    <p className="text-sm">{item.price}kr</p>
                  </div>
                  <p className="text-sm font-normal leading-relaxed text-text-dimmed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
