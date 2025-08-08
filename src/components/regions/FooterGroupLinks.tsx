import React from "react";

const FooterGroupLinks = ({ region }: { region: any }) => {
  if (!region?.components) return null;

  // Group components by type
  const linkGroups = region.components.filter(
    (c: any) => c.componentTemplate?.view === "LinkList"
  );
  const socialLinks = region.components.find(
    (c: any) => c.componentTemplate?.view === "SocialLinks"
  );

  return (
    <div 
    {...{
      'typeof': 'Region'
    }}
    resource="Footer Links">
      <div className="row">
        {/* Render each link group */}
        {linkGroups.map((group: any) => (
          <div key={group.id} className="col-sm-6 col-md-3">
            <div>
              <div className="h4">{group.content.headline}</div>
              <ul className="list-unstyled">
                {group.content.link.values.map((link: any, index: number) => (
                  <li key={index}>
                    <a href={link.internalLink?.url || link.externalLink}>
                      {link.linkText}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        {/* Render social links */}
        {socialLinks && (
          <div className="col-sm-6 col-md-3">
            <div className="icon-list">
              {socialLinks.content.link.values.map((link: any, index: number) => {
                let iconClass = "";
                const url = link.externalLink;
                
                // Determine icon based on URL
                if (url.includes("twitter.com")) {
                  iconClass = "fa-twitter";
                } else if (url.includes("linkedin.com")) {
                  iconClass = "fa-linkedin";
                } else if (url.includes("facebook.com")) {
                  iconClass = "fa-facebook";
                }

                return (
                  <a
                    key={index}
                    href={url}
                    className="fa-stack fa-lg"
                    title={`Visit us on ${iconClass.replace("fa-", "")}`}
                  >
                    <i className="fa fa-circle fa-stack-2x" />
                    <i className={`fa ${iconClass} fa-stack-1x`} />
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FooterGroupLinks;