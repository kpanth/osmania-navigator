import { useNav } from "../context/NavigationContext";
import type { Lang } from "../data/translations";

export default function LangToggle({ short = false }: { short?: boolean }) {
  const { lang, setLang } = useNav();
  const langs: Lang[] = short ? (["EN", "HI"] as Lang[]) : (["EN", "HI", "TE"] as Lang[]);
  return (
    <div className="lang-pill">
      {langs.map((l, i) => (
        <span key={l}>
          <button className={lang === l ? "active" : ""} onClick={() => setLang(l)}>{l}</button>
          {i < langs.length - 1 && " | "}
        </span>
      ))}
    </div>
  );
}
