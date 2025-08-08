import React from "react";

const FooterLinks = ({ region }: { region: any }) => {
  // Assuming region has the structure from your example
  const footerLinksComponent = region?.components?.find((component: any) => component.componentTemplate.view === "LinkList");

  if (!footerLinksComponent) return null;

  const links = footerLinksComponent.content?.link?.values || [];

  if (links.length === 0) return null;

  return (
    <ul className="list-inline text-center">
      <li>
        <small>{footerLinksComponent.content.headline}</small>
      </li>
        {links.map((link: any, index: number) => {
          const linkTitle = link.linkText;
          const linkUrl = link.internalLink?.url;
          const altText = link.alternateText || linkTitle;

          return (
            <li key={index}>
              <a href={linkUrl} title={altText}>
                {linkTitle}
              </a>
            </li>
          );
        })}
      </ul>
  );
};

export default   FooterLinks;
