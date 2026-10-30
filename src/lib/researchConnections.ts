import { graphData } from "@/data/graphData";

// The canvas library resolves link endpoints to objects while it runs.
function endpointId(endpoint: string | { id: string }) {
  return typeof endpoint === "string" ? endpoint : endpoint.id;
}

export function relatedReading(nodeId: string) {
  const methods = graphData.links
    .filter(link => endpointId(link.target) === nodeId &&
      endpointId(link.source).startsWith("s_") && endpointId(link.source) !== "s_python")
    .map(link => endpointId(link.source));
  return graphData.nodes
    .filter(node => node.id !== nodeId && node.details?.link &&
      (node.id.startsWith("p_") || node.id.startsWith("b_")))
    .map(node => ({ node, shared: methods.filter(method =>
      graphData.links.some(link => endpointId(link.source) === method &&
        endpointId(link.target) === node.id)) }))
    .filter(entry => entry.shared.length > 0)
    .sort((a, b) => b.shared.length - a.shared.length ||
      Number(b.node.id.startsWith("b_")) - Number(a.node.id.startsWith("b_")))
    .slice(0, 3)
    .map(({ node, shared }) => ({
      node,
      method: graphData.nodes.find(candidate => candidate.id === shared[0])!.label,
    }));
}
