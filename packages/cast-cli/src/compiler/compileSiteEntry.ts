function getCastConfig() {}

function buildMobileSiteRoutes() { }

function buildPcSiteRoutes() { }

function buildSiteSource() {}
export async function buildSiteEntry() {
    getCastConfig()
    await Promise.all([buildMobileSiteRoutes(), buildPcSiteRoutes(), buildSiteSource()])
}
