import React, { useEffect } from "react";
import { indexTemplate } from "../../../../server/indexTemplate";
import { generateId } from "../../../../utils/react/generateRandomIndex";
import { merge } from "../../../../utils/js/merge";
import { GenericList } from "../../../GenericList";
import styles from "./cardDropdownMenu.css";
import { Dropdown } from "../../../Dropdown";
import { CardMenuButton } from "../CardMenuButton";

const MENU = [
  { text: "Комментарии", icon: "icon-comments" },
  { text: "Поделиться", icon: "icon-shared" },
  { text: "Скрыть", icon: "icon-hide" },
  { text: "Сохранить", icon: "icon-save" },
  { text: "Пожаловаться", icon: "icon-complain" },
  { text: "Закрыть" },
].map(generateId);

export function CardDropdownMenu() {
  const handleItemClick = (id: string) => {
    console.log("id", id);
  };
  return (
    <div className={styles.cardDropdownMenu}>
      <Dropdown button={<CardMenuButton />}>
        <GenericList
          classNameItem={styles.dropdownMenuItem}
          list={MENU.map(
            merge({
              onClick: (id: string) => {
                handleItemClick(id);
              },
            })
          )}
        />
      </Dropdown>
    </div>
  );
}
