import { useTranslation } from "react-i18next";

/**
 * Sider of feed
 * @example
 * return <FeedSider />
*/
const FeedSider: React.FC<{}> = ({}) => {
  const { t } = useTranslation();
  return (
    <div className="w-fit h-full sticky top-4 left-0">
      <div className="border border-br p-4 rounded-2xl flex flex-col gap-4">
        <div>
          <p className="text-default">{t("feed.sider.games")}</p>
        </div>
        <hr
          className="border-0 border-b border-b-br"
        />
        <div>
          <p className="text-default">{t("feed.sider.pictures")}</p>
        </div>
        <hr
          className="border-0 border-b border-b-br"
        />
        <div>
          <p className="text-default">{t("feed.sider.jams")}</p>
        </div>
      </div>
    </div>
  );
}

export default FeedSider;