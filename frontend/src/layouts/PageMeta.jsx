import { Helmet } from "react-helmet-async";
import { useLocation, matchPath } from "react-router-dom";
import { routeMeta } from "../routes/routeMeta";

const SITE_NAME = "ZF";

export default function PageMeta({
  children,
  overrideTitle,
  overrideDescription,
  overrideImage,
}) {
  const { pathname } = useLocation();
  const match = Object.keys(routeMeta).find((path) =>
    matchPath({ path, end: true }, pathname),
  );
  const meta = routeMeta[match] || {};

  const title = overrideTitle || meta.title;
  const description = overrideDescription || meta.description;
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

  return (
    <>
      <Helmet>
        <title>{fullTitle}</title>
        {description && <meta name="description" content={description} />}
        <meta property="og:title" content={fullTitle} />
        {description && (
          <meta property="og:description" content={description} />
        )}
        {overrideImage && <meta property="og:image" content={overrideImage} />}
      </Helmet>
      {children}
    </>
  );
}
