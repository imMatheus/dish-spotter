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
      <h2 className="mb-2 text-2xl font-bold">Menu</h2>

      {menu.sections.map((section) => (
        <div key={section.name}>
          <h3 className="text-lg font-medium">{section.name}</h3>

          <div className="space-y-2"></div>
        </div>
      ))}
    </div>
  );
};
