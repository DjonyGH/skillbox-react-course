import React from "react";
import { indexTemplate } from "../../../../server/indexTemplate";
import { generateId } from "../../../../utils/react/generateRundomIndex";
import { merge } from "../../../../utils/js/merge";
import { MyList } from "../../../GenericList";
import styles from "./cardDropdownMenu.css";

const MENU = [
  { value: "Комментарии" },
  { value: "Поделиться" },
  { value: "Скрыть" },
  { value: "Сохранить" },
  { value: "Пожаловаться" },
  { value: "Закрыть" },
].map(generateId);

export function CardDropdownMenu() {
  const handleItemClick = (id: string) => {
    console.log(id);
  };
  return (
    <div className={styles.cardDropdownMenu}>
      <MyList
        // @ts-ignore
        // list={Menu.map((item) => ({
        //   ...item,
        //   onClick: () => {
        //     console.log(item.id);
        //   },
        // }))}
        list={MENU.map(
          merge({
            onClick: () => {
              handleItemClick;
            },
          })
        )}
      />
    </div>
  );
}
