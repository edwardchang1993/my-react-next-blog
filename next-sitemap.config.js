/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: "https://edwardchang.blog/",
  generateRobotsTxt: true, // 產生 robots.txt
  sitemapSize: 5000, // 可選，控制 sitemap 頁數
  exclude: [], // 可選，排除特定頁面
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "Googlebot", allow: "/" },
    ],
  },
};
