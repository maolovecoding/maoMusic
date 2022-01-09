/**
 * @FileName: string-to-nodes.ts
 * @Description: 将字符串转为富文本节点
 * @author 毛毛
 * @date 2022-01-09 13:36
 */
function keywordToNodes(keyword: string, matchValue: string) {
  // 一个富文本的nodes
  const nodes: any[] = [];
  if (keyword.toLowerCase().startsWith(matchValue.toLowerCase())) {
    // 匹配到的搜索词
    const key1 = keyword.slice(0, matchValue.length);
    // node1
    const node1 = {
      name: "span",
      attrs: {
        style: "color:#26ce8a; font-weight: 500;"
      },
      children: [
        {type: "text", text: key1}
      ]
    };
    const key2 = keyword.slice(matchValue.length);
    const node2 = {
      name: "span",
      attrs: {
        style: "color:#000;"
      },
      children: [
        {type: "text", text: key2}
      ]
    };
    nodes.push(node1);
    nodes.push(node2);
  } else {
    const node = {
      name: "span",
      attrs: {
        style: "color:#000;"
      },
      children: [
        {type: "text", text: keyword}
      ]
    };
    nodes.push(node);
  }
  return nodes;
}

/**
 * 将一个字符串数组 转为nodes节点
 * @param keywords 字符串数组
 * @param matchValue 匹配的关键字
 */
export function keywordsToNodes(keywords: any[], matchValue: string) {
  const suggestKeywords: string[] = keywords.map(item => item.keyword);
  const suggestSongNodes: any = [];
  for (const suggestKeyword of suggestKeywords) {
    const nodes = keywordToNodes(suggestKeyword, matchValue);
    suggestSongNodes.push(nodes);
  }
  return suggestSongNodes;
}