import React, { useEffect } from "react";
import { SunriseIcon, SunsetIcon } from "./assets";
import { useStore } from "./store";
import { useStart } from "./hooks/useStart";
import { usePaging } from "./hooks/usePaging";
const App = () => {
  const { openSidebar, setOpenSidebar } = useStore();
  const { scrapeImage } = useStart();
  const { showCurrentPage } = usePaging();
  useEffect(() => {
    scrapeImage();
  }, []);

  return (
    <div className={`unkai-yt-container ${openSidebar && "open"}`}>
      <div className="unkai-yt-icon">
        <span
          onClick={() => {
            setOpenSidebar(!openSidebar);
          }}
        >
          {openSidebar ? <SunsetIcon /> : <SunriseIcon />}
        </span>
      </div>
      <div className="unkai-yt-content">{showCurrentPage()}</div>
    </div>
  );
};

export default App;
