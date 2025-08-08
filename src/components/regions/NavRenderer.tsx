import React from 'react';

const NavRenderer = ({ region }: { region: any }) => {
  // Find the component titled "Nav"
  const navComponent = region?.components?.find((component: any) => component.componentTemplate.view === "LinkList");

  if (!navComponent) return null;

  const links = navComponent.content?.link?.values || [];

  if (links.length === 0) return null;

  return (
      <ul className="nav navbar-nav utility-nav">
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

export default NavRenderer;
