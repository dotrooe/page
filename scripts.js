/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"5BptPclIBLlcedTx","label":"Reddit","bookmarks":[{"id":"Ye6PZJDGCD3wtxYt","label":"r/wallpaper","url":"https://www.reddit.com/r/wallpaper/"},{"id":"y6HGaxfqG4BblU3T","label":"r/LivestreamFail","url":"https://www.reddit.com/r/LivestreamFail/"},{"id":"ll8q3v077Mo7Q2Vy","label":"r/blender","url":"https://www.reddit.com/r/blender/"},{"id":"cXfPKPua1oA2xJRt","label":"r/unix","url":"reddit.com/r/unixporn/"}]},{"id":"6H5VHlnNcaRATWIm","label":"Social","bookmarks":[{"id":"xBpvhEvHlsi9mUqH","label":"Twitch.tv","url":"https://www.twitch.tv/xQc"},{"id":"kfXTy9rjmTsxImVt","label":"messenger","url":"messenger.com"},{"id":"WaUTAPkLwRN5VZRM","label":"YouTube","url":"youtube.com"},{"id":"JSK8qcK6WmKbAzwT","label":"Twitter","url":"twitter.com"}]},{"id":"ZOAMi5rxU4ZQxOvi","label":"Src","bookmarks":[{"id":"9xl4i83sywYEnJKv","label":"loader","url":"https://loader.to/"},{"id":"IN6wQLr6A161RVpz","label":"textures","url":"https://polyhaven.com/"},{"id":"Rbauhv2tQV6Yu4NH","label":"github","url":"github.com"},{"id":"FGIn2N79L8trS6La","label":"Google Drive","url":"https://drive.google.com/drive/u/0/my-drive"}]},{"id":"LI8wFD68OCx6qhvg","label":"Szkoła","bookmarks":[{"id":"lISo1C0MZPyP0Cfn","label":"karta wzorów","url":"https://arkusze.pl/informatory/wzory-matematyczne-2023.pdf"},{"id":"SPpC0lAlmKJWJZQA","label":"Arkusze Maturalne","url":"arkusze.pl"},{"id":"ryk1hkwIs6akGaIQ","label":"Odrabiamy","url":"https://odrabiamy.pl/moje"},{"id":"TTeQFaBDMVSvVJ36","label":"Wolfram Alpha","url":"https://www.wolframalpha.com/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
