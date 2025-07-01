import { n as jsxRuntimeExports, H as HighlightJS, ah as SYNTAX_HIGHLIGHTING_LANGUAGES, r as reactExports, aw as React, aP as CircleHelp, q as getVSCodeAPI, R as Root, F as Field, aC as Label, C as Control, az as ChevronDown, ay as ChevronRight, aF as Badge, B as Button, aO as ChevronLeft, aA as X, aK as Root2, aM as List, aL as Content, aN as Trigger, u as Link, aB as FileText, x as createRoot } from './index-BG46XD3S.js';

const extractAutoeditData = (entry) => {
  const phase = entry.state.phase;
  const discardReason = getDiscardReason(entry);
  const filePath = getFilePath(entry);
  const fileName = getFileName(entry);
  const codeToRewrite = getCodeToRewrite(entry);
  const prediction = getPrediction(entry);
  const triggerKind = getTriggerKind(entry);
  const positionInfo = getPositionInfo(entry);
  const languageId = getLanguageId(entry);
  const decorationStats = getDecorationStats(entry);
  const model = getModel(entry);
  const timing = getDetailedTimingInfo(entry);
  const document = getDocument(entry);
  const position = getPosition(entry);
  const modelResponse = getModelResponse(entry);
  const context = getContext(entry);
  const renderOutput = getRenderOutput(entry);
  const hotStreakId = getHotStreakId(entry);
  return {
    phase,
    discardReason,
    filePath,
    fileName,
    codeToRewrite,
    prediction,
    triggerKind,
    positionInfo,
    languageId,
    decorationStats,
    model,
    timing,
    document,
    position,
    modelResponse,
    context,
    renderOutput,
    hotStreakId
  };
};
const getStartTime = (entry) => {
  const { state } = entry;
  if ("startedAt" in state) {
    return state.startedAt;
  }
  return entry.updatedAt;
};
const getDocument = (entry) => {
  if ("document" in entry.state) {
    return entry.state.document;
  }
  return null;
};
const getPosition = (entry) => {
  if ("position" in entry.state) {
    return entry.state.position;
  }
  return null;
};
const getModel = (entry) => {
  if ("payload" in entry.state && "model" in entry.state.payload) {
    return entry.state.payload.model;
  }
  return null;
};
const getFilePath = (entry) => {
  return entry.state.filePath;
};
const getFileName = (entry) => {
  if ("document" in entry.state && entry.state.document) {
    const uri = entry.state.document.uri || entry.state.document.fileName;
    if (uri) {
      const fileName = uri.path.split("/").pop() || "Unknown file";
      return fileName;
    }
  }
  return "Unknown file";
};
const getCodeToRewrite = (entry) => {
  if ("codeToReplaceData" in entry.state && "codeToRewrite" in entry.state.codeToReplaceData) {
    return entry.state.codeToReplaceData.codeToRewrite;
  }
  return void 0;
};
const getContext = (entry) => {
  if ("context" in entry.state) {
    return entry.state.context;
  }
  return [];
};
const getTriggerKind = (entry) => {
  if ("payload" in entry.state && "triggerKind" in entry.state.payload) {
    const triggerMap = {
      1: "Automatic",
      2: "Manual",
      3: "Suggest Widget",
      4: "Cursor"
    };
    return triggerMap[entry.state.payload.triggerKind] || "Unknown";
  }
  return "Unknown trigger";
};
const getPositionInfo = (entry) => {
  if ("position" in entry.state && entry.state.position) {
    const line = entry.state.position.line !== void 0 ? entry.state.position.line + 1 : "?";
    const character = entry.state.position.character !== void 0 ? entry.state.position.character : "?";
    return `${line}:${character}`;
  }
  return "";
};
const DISCARD_REASONS = {
  1: "Client Aborted",
  2: "Empty Prediction",
  3: "Prediction Equals Code to Rewrite",
  4: "Recent Edits",
  5: "Suffix Overlap",
  6: "Empty Prediction After Inline Completion Extraction",
  7: "No Active Editor",
  8: "Conflicting Decoration With Edits",
  9: "Not Enough Lines in Editor",
  10: "Stale Throttled Request",
  11: "Next Cursor Suggestion Shown Instead",
  12: "Big Diff Modification"
};
const getDiscardReason = (entry) => {
  if (entry.state.phase === "discarded" && "payload" in entry.state && "discardReason" in entry.state.payload) {
    return DISCARD_REASONS[entry.state.payload.discardReason] || `Unknown (${entry.state.payload.discardReason})`;
  }
  return null;
};
const getLanguageId = (entry) => {
  if ("payload" in entry.state && "languageId" in entry.state.payload) {
    return entry.state.payload.languageId;
  }
  return null;
};
const getDecorationStats = (entry) => {
  if ("payload" in entry.state && "decorationStats" in entry.state.payload && entry.state.payload.decorationStats) {
    const stats = entry.state.payload.decorationStats;
    const addedLines = stats.addedLines || 0;
    const modifiedLines = stats.modifiedLines || 0;
    const removedLines = stats.removedLines || 0;
    const parts = [];
    if (addedLines > 0) parts.push(`+${addedLines} lines`);
    if (modifiedLines > 0) parts.push(`~${modifiedLines} lines`);
    if (removedLines > 0) parts.push(`-${removedLines} lines`);
    return parts.length > 0 ? parts.join(", ") : null;
  }
  return null;
};
const getPayload = (entry) => {
  if ("payload" in entry.state) {
    return entry.state.payload;
  }
  return null;
};
const getRequestId = (entry) => {
  return entry.state.requestId;
};
const getPrediction = (entry) => {
  if ("prediction" in entry.state && typeof entry.state.prediction === "string") {
    return entry.state.prediction;
  }
  return null;
};
const getNetworkLatencyInfo = (entry) => {
  const upstreamLatency = entry.state.phase === "started" ? entry.state.payload.upstreamLatency : "payload" in entry.state && "upstreamLatency" in entry.state.payload ? entry.state.payload.upstreamLatency : void 0;
  const gatewayLatency = entry.state.phase === "started" ? entry.state.payload.gatewayLatency : "payload" in entry.state && "gatewayLatency" in entry.state.payload ? entry.state.payload.gatewayLatency : void 0;
  return { upstreamLatency, gatewayLatency };
};
const getSuccessModelResponse = (entry) => {
  if ("modelResponse" in entry.state && (entry.state.modelResponse.type === "success" || entry.state.modelResponse.type === "partial")) {
    return entry.state.modelResponse;
  }
  return null;
};
const getHotStreakChunks = (entry) => {
  if ("hotStreakChunks" in entry.state && Array.isArray(entry.state.hotStreakChunks) && entry.state.hotStreakChunks.length > 0) {
    return entry.state.hotStreakChunks;
  }
  return null;
};
const getHotStreakId = (entry) => {
  if ("hotStreakId" in entry.state && entry.state.hotStreakId) {
    return entry.state.hotStreakId;
  }
  return null;
};
const getFullResponseBody = (entry) => {
  if ("modelResponse" in entry.state && entry.state.modelResponse.type === "success" && entry.state.modelResponse?.responseBody) {
    return entry.state.modelResponse.responseBody;
  }
  return null;
};
const getModelResponse = (entry) => {
  if ("modelResponse" in entry.state) {
    return entry.state.modelResponse;
  }
  return null;
};
const getRenderOutput = (entry) => {
  if ("renderOutput" in entry.state) {
    return entry.state.renderOutput;
  }
  return null;
};
const AutoeditDataSDK = {
  extractAutoeditData,
  getStartTime,
  getFilePath,
  getFileName,
  getCodeToRewrite,
  getTriggerKind,
  getPositionInfo,
  getDiscardReason,
  getLanguageId,
  getDecorationStats,
  getPayload,
  getRequestId,
  getPrediction,
  getDocument,
  getPosition,
  getModel,
  getNetworkLatencyInfo,
  getFullResponseBody,
  getModelResponse,
  getHotStreakChunks,
  getHotStreakId
};

var PhaseNames = /* @__PURE__ */ ((PhaseNames2) => {
  PhaseNames2["Start"] = "Start";
  PhaseNames2["ContextLoaded"] = "Context Loaded";
  PhaseNames2["Inference"] = "Inference";
  PhaseNames2["Network"] = "Network";
  PhaseNames2["PostProcessed"] = "Post Processed";
  PhaseNames2["Suggested"] = "Suggested";
  PhaseNames2["Read"] = "Read";
  PhaseNames2["Accepted"] = "Accepted";
  PhaseNames2["Rejected"] = "Rejected";
  PhaseNames2["Discarded"] = "Discarded";
  return PhaseNames2;
})(PhaseNames || {});
const formatLatency = (milliseconds) => {
  if (milliseconds === void 0) {
    return "unknown";
  }
  if (milliseconds < 1) {
    return "< 1ms";
  }
  if (milliseconds < 1e3) {
    return `${Math.round(milliseconds)}ms`;
  }
  if (milliseconds < 6e4) {
    return `${(milliseconds / 1e3).toFixed(1)}s`;
  }
  const minutes = Math.floor(milliseconds / 6e4);
  const seconds = (milliseconds % 6e4 / 1e3).toFixed(1);
  return `${minutes}m ${seconds}s`;
};
const calculateDuration = (start, end) => {
  if (typeof start !== "number" || typeof end !== "number") {
    return "unknown";
  }
  return formatLatency(end - start);
};
const extractPhaseInfo = (entry) => {
  const { state } = entry;
  const startTime = "startedAt" in state ? state.startedAt : entry.updatedAt;
  const inferenceTime = extractInferenceTime(state);
  const phases = [
    { name: "Start" /* Start */, time: startTime },
    {
      name: "Context Loaded" /* ContextLoaded */,
      time: "contextLoadedAt" in state ? state.contextLoadedAt : void 0
    }
  ];
  if (inferenceTime > 0 && "contextLoadedAt" in state && "loadedAt" in state) {
    const inferenceEndTime = state.contextLoadedAt + inferenceTime;
    phases.push({
      name: "Inference" /* Inference */,
      time: inferenceEndTime
    });
  }
  phases.push(
    {
      name: "Network" /* Network */,
      time: "loadedAt" in state ? state.loadedAt : void 0
    },
    {
      name: "Post Processed" /* PostProcessed */,
      time: "postProcessedAt" in state ? state.postProcessedAt : void 0
    },
    {
      name: "Suggested" /* Suggested */,
      time: "suggestedAt" in state ? state.suggestedAt : void 0
    },
    {
      name: "Read" /* Read */,
      time: "readAt" in state ? state.readAt : void 0
    },
    {
      name: "Accepted" /* Accepted */,
      time: "acceptedAt" in state ? state.acceptedAt : void 0
    },
    {
      name: "Rejected" /* Rejected */,
      time: "rejectedAt" in state ? state.rejectedAt : void 0
    },
    {
      name: "Discarded" /* Discarded */,
      time: "discardedAt" in state ? state.discardedAt : entry.state.phase === "discarded" ? entry.updatedAt : void 0
    }
  );
  const validPhases = phases.filter((phase) => phase.time !== void 0);
  validPhases.sort((a, b) => (a.time || 0) - (b.time || 0));
  return validPhases;
};
const extractInferenceTime = (state) => {
  let inferenceTime = 0;
  if ("modelResponse" in state && state.modelResponse?.responseHeaders?.["fireworks-server-processing-time"]) {
    inferenceTime = Number.parseFloat(state.modelResponse.responseHeaders["fireworks-server-processing-time"]) * 1e3;
    if (Number.isNaN(inferenceTime)) {
      inferenceTime = 0;
    }
  }
  return inferenceTime;
};
const extractEnvoyUpstreamServiceTime = (state) => {
  let envoyUpstreamServiceTime = 0;
  if ("modelResponse" in state && state.modelResponse?.responseHeaders?.["x-envoy-upstream-service-time"]) {
    envoyUpstreamServiceTime = Number.parseFloat(
      state.modelResponse.responseHeaders["x-envoy-upstream-service-time"]
    );
    if (Number.isNaN(envoyUpstreamServiceTime)) {
      envoyUpstreamServiceTime = 0;
    }
  }
  return envoyUpstreamServiceTime;
};
const calculateTimelineWidths = (segments) => {
  const totalDuration = segments.reduce((sum, segment) => sum + segment.duration, 0);
  const MIN_WIDTH_PERCENT = 5;
  const smallestSegmentPercentage = Math.min(...segments.map((s) => s.duration / totalDuration * 100));
  if (smallestSegmentPercentage < MIN_WIDTH_PERCENT) {
    const smallSegments = segments.filter(
      (s) => s.duration / totalDuration * 100 < MIN_WIDTH_PERCENT
    );
    const smallSegmentsCount = smallSegments.length;
    const smallSegmentsPercentage = MIN_WIDTH_PERCENT * smallSegmentsCount;
    const remainingPercentage = 100 - smallSegmentsPercentage;
    const normalSegmentsDuration = segments.filter((s) => s.duration / totalDuration * 100 >= MIN_WIDTH_PERCENT).reduce((sum, s) => sum + s.duration, 0);
    return segments.map((segment) => {
      if (segment.duration / totalDuration * 100 < MIN_WIDTH_PERCENT) {
        return MIN_WIDTH_PERCENT;
      }
      return segment.duration / normalSegmentsDuration * remainingPercentage;
    });
  }
  return segments.map((segment) => segment.duration / totalDuration * 100);
};
const calculateTotalDuration = (phases, upToPhase) => {
  if (phases.length < 1) {
    return 0;
  }
  const startTime = phases[0]?.time ?? 0;
  if (upToPhase) {
    const targetPhase = phases.find((phase) => phase.name === upToPhase);
    if (targetPhase?.time) {
      return targetPhase.time - startTime;
    }
  }
  return phases.length > 1 ? (phases[phases.length - 1]?.time ?? 0) - startTime : 0;
};
const getDetailedTimingInfo = (entry) => {
  const result = {
    predictionDuration: "",
    inferenceTime: void 0,
    details: []
  };
  const phases = extractPhaseInfo(entry);
  const predictionDurationMs = calculateTotalDuration(phases, "Suggested" /* Suggested */);
  if (predictionDurationMs > 0) {
    result.predictionDuration = formatLatency(predictionDurationMs);
    result.predictionDurationMs = predictionDurationMs;
  } else if ("payload" in entry.state && "latency" in entry.state.payload) {
    const payloadLatency = entry.state.payload.latency;
    result.predictionDuration = formatLatency(payloadLatency);
    result.predictionDurationMs = payloadLatency;
  } else {
    result.predictionDuration = "unknown";
  }
  const state = entry.state;
  const startTime = "startedAt" in state ? state.startedAt : void 0;
  const inferenceTimeMs = extractInferenceTime(state);
  if (inferenceTimeMs > 0) {
    result.inferenceTime = formatLatency(inferenceTimeMs);
    result.inferenceTimeMs = inferenceTimeMs;
  }
  const envoyUpstreamServiceTimeMs = extractEnvoyUpstreamServiceTime(state);
  if (envoyUpstreamServiceTimeMs > 0) {
    result.envoyUpstreamServiceTime = formatLatency(envoyUpstreamServiceTimeMs);
    result.envoyUpstreamServiceTimeMs = envoyUpstreamServiceTimeMs;
  }
  if (startTime !== void 0) {
    if ("contextLoadedAt" in state) {
      const contextLoadingMs = state.contextLoadedAt - startTime;
      result.details.push({
        label: "Context Loaded" /* ContextLoaded */,
        value: calculateDuration(startTime, state.contextLoadedAt),
        valueMs: contextLoadingMs
      });
    }
    if ("contextLoadedAt" in state && "loadedAt" in state) {
      let modelGenerationTime = state.loadedAt - state.contextLoadedAt;
      if (inferenceTimeMs > 0) {
        modelGenerationTime -= inferenceTimeMs;
        result.details.push({
          label: "Inference" /* Inference */,
          value: formatLatency(inferenceTimeMs),
          valueMs: inferenceTimeMs
        });
      } else if (envoyUpstreamServiceTimeMs > 0) {
        modelGenerationTime -= envoyUpstreamServiceTimeMs;
        result.details.push({
          label: "Envoy Latency",
          value: formatLatency(envoyUpstreamServiceTimeMs),
          valueMs: envoyUpstreamServiceTimeMs
        });
      }
      const networkTimeMs = Math.max(0, modelGenerationTime);
      result.details.push({
        label: "Network" /* Network */,
        value: formatLatency(networkTimeMs),
        valueMs: networkTimeMs
      });
    }
    if ("loadedAt" in state && "postProcessedAt" in state) {
      const postProcessingMs = state.postProcessedAt - state.loadedAt;
      result.details.push({
        label: "Post Processed" /* PostProcessed */,
        value: calculateDuration(state.loadedAt, state.postProcessedAt),
        valueMs: postProcessingMs
      });
    }
    if ("postProcessedAt" in state && "suggestedAt" in state) {
      const timeToSuggestMs = state.suggestedAt - state.postProcessedAt;
      result.details.push({
        label: "Suggested" /* Suggested */,
        value: calculateDuration(state.postProcessedAt, state.suggestedAt),
        valueMs: timeToSuggestMs
      });
    }
    if ("payload" in state && "gatewayLatency" in state.payload && state.payload.gatewayLatency) {
      const gatewayLatencyMs = state.payload.gatewayLatency;
      result.details.push({
        label: "Gateway Latency",
        value: formatLatency(gatewayLatencyMs),
        valueMs: gatewayLatencyMs
      });
    }
    if ("payload" in state && "upstreamLatency" in state.payload && state.payload.upstreamLatency) {
      const upstreamLatencyMs = state.payload.upstreamLatency;
      result.details.push({
        label: "Upstream Latency",
        value: formatLatency(upstreamLatencyMs),
        valueMs: upstreamLatencyMs
      });
    }
  }
  return result;
};
const createSegmentKey = (segment) => {
  return `${segment.name}-${segment.startTime}-${segment.endTime}`;
};
const createPhaseKey = (phase) => {
  return `${phase.name}-${phase.time || "undefined"}`;
};

const getStatusColor = (phase) => {
  switch (phase) {
    case "started":
      return "tw-bg-yellow-200 tw-text-yellow-800";
    case "contextLoaded":
      return "tw-bg-blue-200 tw-text-blue-800";
    case "loaded":
      return "tw-bg-indigo-200 tw-text-indigo-800";
    case "postProcessed":
      return "tw-bg-purple-200 tw-text-purple-800";
    case "suggested":
      return "tw-bg-fuchsia-200 tw-text-fuchsia-800";
    case "read":
      return "tw-bg-teal-200 tw-text-teal-800";
    case "accepted":
      return "tw-bg-green-200 tw-text-green-800";
    case "rejected":
      return "tw-bg-red-200 tw-text-red-800";
    case "discarded":
      return "tw-bg-gray-200 tw-text-gray-800";
    default:
      return "tw-bg-gray-200 tw-text-gray-800";
  }
};
const getPhaseColor = (phaseName) => {
  switch (phaseName) {
    case "Start":
      return "tw-bg-gray-500";
    case "Context Loaded":
      return "tw-bg-amber-500";
    case "Inference":
      return "tw-bg-indigo-500";
    case "Network":
      return "tw-bg-blue-500";
    case "Post Processed":
      return "tw-bg-purple-500";
    case "Suggested":
      return "tw-bg-pink-500";
    case "Read":
      return "tw-bg-cyan-500";
    case "Accepted":
      return "tw-bg-green-500";
    case "Rejected":
      return "tw-bg-red-500";
    case "Discarded":
      return "tw-bg-rose-600";
    default:
      return "tw-bg-gray-500";
  }
};

const SyntaxHighlighter = ({ highlightedCode, className }) => {
  if (!highlightedCode) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className,
      dangerouslySetInnerHTML: { __html: highlightedCode }
    }
  );
};

HighlightJS.registerLanguage("json", SYNTAX_HIGHLIGHTING_LANGUAGES.json);
const useJsonHighlighting = (data) => {
  return reactExports.useMemo(() => {
    if (data === null || data === void 0) return null;
    try {
      const jsonString = JSON.stringify(data, null, 2);
      const result = HighlightJS.highlight(jsonString, { language: "json" });
      return result.value;
    } catch (error) {
      console.error("Error highlighting JSON:", error);
      return null;
    }
  }, [data]);
};
const JsonViewer = ({ data, className = "", maxHeight = "80", title }) => {
  const highlightedJson = useJsonHighlighting(data);
  if (data === null || data === void 0) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `tw-space-y-2 ${className}`, children: [
    title && /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "tw-text-sm tw-font-medium tw-mb-2", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `tw-bg-gray-100 tw-dark:tw-bg-gray-800 tw-p-3 tw-rounded tw-text-xs tw-max-h-${maxHeight} tw-overflow-y-auto`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "tw-whitespace-pre-wrap tw-m-0 tw-font-mono tw-leading-relaxed", children: highlightedJson ? /* @__PURE__ */ jsxRuntimeExports.jsx(SyntaxHighlighter, { highlightedCode: highlightedJson }) : JSON.stringify(data, null, 2) })
      }
    )
  ] });
};

const AutoeditsConfigSection = ({ entry }) => {
  const config = entry.autoeditsProviderConfig;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-bg-gray-50 tw-dark:tw-bg-gray-800 tw-rounded-md tw-overflow-hidden tw-border tw-border-gray-200 tw-dark:tw-border-gray-700 tw-shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-bg-gray-100 tw-dark:tw-bg-gray-700 tw-px-4 tw-py-2 tw-border-b tw-border-gray-200 tw-dark:tw-border-gray-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-text-xs tw-font-semibold tw-text-gray-600 tw-dark:tw-text-gray-300", children: "The configuration used for this autoedit request." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(JsonViewer, { data: config, className: "tw-m-0" }) })
  ] }) });
};

const CodeToRewriteDataSection = ({ entry }) => {
  const [isModalOpen, setIsModalOpen] = reactExports.useState(false);
  const [copySuccess, setCopySuccess] = reactExports.useState(false);
  const codeToRewriteDataRef = reactExports.useRef(null);
  const codeToRewriteData = getCodeToRewrite(entry);
  const formattedCodeToRewriteData = formatCodeToRewriteData();
  const handleKeyDown = reactExports.useCallback(
    (event) => {
      if (event.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    },
    [isModalOpen]
  );
  reactExports.useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isModalOpen, handleKeyDown]);
  const handleCopyCodeToRewriteData = () => {
    if (formattedCodeToRewriteData) {
      navigator.clipboard.writeText(formattedCodeToRewriteData).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2e3);
      }).catch((err) => console.error("Failed to copy text: ", err));
    }
  };
  function formatCodeToRewriteData() {
    if (!codeToRewriteData) {
      return "No code to rewrite data available";
    }
    try {
      const obj = typeof codeToRewriteData === "string" ? JSON.parse(codeToRewriteData) : codeToRewriteData;
      const fieldOrder = [
        "prefixBeforeArea",
        "suffixAfterArea",
        "prefixInArea",
        "codeToRewrite",
        "suffixInArea"
      ];
      let result = "";
      for (const field of fieldOrder) {
        if (field in obj) {
          const value = obj[field];
          result += `<${field}>
${value}
</${field}>
`;
        }
      }
      for (const [key, value] of Object.entries(obj)) {
        if (!fieldOrder.includes(key)) {
          result += `<${key}>
${typeof value === "string" ? value : JSON.stringify(value, null, 2)}
</${key}>
`;
        }
      }
      return result;
    } catch (error) {
      return JSON.stringify(codeToRewriteData, null, 2);
    }
  }
  if (!codeToRewriteData) {
    return null;
  }
  const codeToRewriteDataClass = "tw-bg-gray-50 tw-dark:tw-bg-gray-800 tw-p-4 tw-rounded tw-text-xs tw-font-mono tw-border-0 tw-m-0 tw-text-gray-800 dark:tw-text-gray-200 tw-leading-relaxed tw-whitespace-pre-wrap tw-h-full tw-overflow-y-auto";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-mb-4 tw-flex tw-flex-col tw-h-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-flex tw-justify-end tw-items-center tw-mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-space-x-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleCopyCodeToRewriteData,
            className: "tw-text-xs tw-text-gray-600 hover:tw-text-gray-800 dark:tw-text-gray-400 dark:hover:tw-text-gray-200 tw-rounded tw-px-2 tw-py-1 tw-bg-gray-100 hover:tw-bg-gray-200 dark:tw-bg-gray-700 dark:hover:tw-bg-gray-600 tw-transition-colors tw-duration-150",
            title: "Copy prompt to clipboard",
            "aria-label": "Copy prompt to clipboard",
            children: copySuccess ? "Copied!" : "Copy"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setIsModalOpen(true),
            className: "tw-text-xs tw-text-gray-600 hover:tw-text-gray-800 dark:tw-text-gray-400 dark:hover:tw-text-gray-200 tw-rounded tw-px-2 tw-py-1 tw-bg-gray-100 hover:tw-bg-gray-200 dark:tw-bg-gray-700 dark:hover:tw-bg-gray-600 tw-transition-colors tw-duration-150",
            title: "View in fullscreen",
            "aria-label": "View code to rewrite data in fullscreen",
            children: "Fullscreen"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "tw-border tw-border-gray-200 dark:tw-border-gray-700 tw-rounded-md tw-max-h-100 tw-overflow-y-auto",
          role: "region",
          "aria-label": "Prompt content",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { ref: codeToRewriteDataRef, className: codeToRewriteDataClass, children: formattedCodeToRewriteData })
        }
      )
    ] }),
    isModalOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "tw-fixed tw-inset-0 tw-z-50 tw-flex tw-items-center tw-justify-center tw-p-4 tw-bg-black tw-bg-opacity-80 tw-backdrop-blur-sm tw-transition-opacity tw-duration-300",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "modal-title",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-bg-white tw-dark:tw-bg-gray-900 tw-rounded-lg tw-shadow-xl tw-w-full tw-h-full tw-max-w-screen-xl tw-max-h-screen tw-flex tw-flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-justify-between tw-items-center tw-p-4 tw-border-b tw-border-gray-200 tw-dark:tw-border-gray-700", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                id: "modal-title",
                className: "tw-text-lg tw-font-medium tw-text-gray-900 dark:tw-text-gray-100",
                children: "Code To Rewrite Data"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-space-x-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handleCopyCodeToRewriteData,
                  className: "tw-flex tw-items-center tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-rounded-md tw-bg-gray-100 hover:tw-bg-gray-200 tw-text-gray-700 dark:tw-bg-gray-700 dark:hover:tw-bg-gray-600 dark:tw-text-gray-200 tw-transition-colors tw-duration-150",
                  "aria-label": "Copy code to rewrite data to clipboard",
                  children: copySuccess ? "Copied!" : "Copy code to rewrite data"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setIsModalOpen(false),
                  className: "tw-flex tw-items-center tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-rounded-md tw-bg-gray-100 hover:tw-bg-gray-200 tw-text-gray-700 dark:tw-bg-gray-700 dark:hover:tw-bg-gray-600 dark:tw-text-gray-200 tw-transition-colors tw-duration-150",
                  "aria-label": "Close modal",
                  children: "Close (Esc)"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-flex-grow tw-overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-h-full tw-overflow-auto tw-rounded-md tw-bg-gray-50 tw-dark:tw-bg-gray-800 tw-border tw-border-gray-200 dark:tw-border-gray-700", children: /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "tw-whitespace-pre-wrap tw-font-mono tw-text-sm tw-p-5 tw-m-0 tw-h-full tw-overflow-y-auto tw-text-gray-800 dark:tw-text-gray-200 tw-leading-relaxed", children: formattedCodeToRewriteData }) }) })
        ] })
      }
    )
  ] });
};

const ContextInfoSection = ({ entry }) => {
  if (!("payload" in entry.state) || !("contextSummary" in entry.state.payload) || !entry.state.payload.contextSummary) {
    return null;
  }
  const contextSummary = entry.state.payload.contextSummary;
  const formatDuration = (ms) => {
    return `${ms.toFixed(2)}ms`;
  };
  const formatChars = (chars) => {
    return chars >= 1e3 ? `${(chars / 1e3).toFixed(1)}K` : chars.toString();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-flex tw-flex-col tw-gap-y-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-bg-gray-50 dark:tw-bg-gray-800/50 tw-rounded-md tw-p-4 tw-mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-grid tw-grid-cols-2 tw-gap-x-6 tw-gap-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-flex-col tw-gap-y-2", children: [
        "strategy" in contextSummary && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-grid tw-grid-cols-[1fr_auto] tw-items-baseline", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-font-medium", children: "Strategy:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: String(contextSummary.strategy) })
        ] }),
        "duration" in contextSummary && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-grid tw-grid-cols-[1fr_auto] tw-items-baseline", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-font-medium", children: "Duration:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDuration(contextSummary.duration) })
        ] }),
        "totalChars" in contextSummary && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-grid tw-grid-cols-[1fr_auto] tw-items-baseline", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-font-medium", children: "Total Characters:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatChars(contextSummary.totalChars) })
        ] }),
        "prefixChars" in contextSummary && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-grid tw-grid-cols-[1fr_auto] tw-items-baseline", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-font-medium", children: "Prefix Characters:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatChars(contextSummary.prefixChars) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-flex-col tw-gap-y-2", children: [
        "suffixChars" in contextSummary && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-grid tw-grid-cols-[1fr_auto] tw-items-baseline", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-font-medium", children: "Suffix Characters:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatChars(contextSummary.suffixChars) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-grid tw-grid-cols-[1fr_auto] tw-items-baseline", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-font-medium", children: "Context Items:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: contextSummary && "numContextItems" in contextSummary ? String(contextSummary.numContextItems) : "0" })
        ] }),
        "snippetContextItems" in contextSummary && contextSummary.snippetContextItems !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-grid tw-grid-cols-[1fr_auto] tw-items-baseline", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-font-medium", children: "Snippet Items:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: String(contextSummary.snippetContextItems) })
        ] }),
        "symbolContextItems" in contextSummary && contextSummary.symbolContextItems !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-grid tw-grid-cols-[1fr_auto] tw-items-baseline", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-font-medium", children: "Symbol Items:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: String(contextSummary.symbolContextItems) })
        ] }),
        "localImportsContextItems" in contextSummary && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-grid tw-grid-cols-[1fr_auto] tw-items-baseline", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-font-medium", children: "Local Imports:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: String(contextSummary.localImportsContextItems) })
        ] })
      ] })
    ] }) }),
    "retrieverStats" in contextSummary && contextSummary.retrieverStats.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-mt-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "tw-font-medium tw-mb-2 tw-text-base", children: "Retriever Statistics" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-overflow-x-auto tw-border tw-border-gray-200 tw-dark:tw-border-gray-700 tw-rounded-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-grid tw-grid-cols-[minmax(150px,auto)_repeat(4,minmax(100px,auto))] tw-gap-3 tw-p-2 tw-bg-gray-100 tw-dark:tw-bg-gray-800 tw-font-medium tw-text-xs tw-text-gray-700 tw-dark:tw-text-gray-300 tw-border-b tw-border-gray-200 tw-dark:tw-border-gray-700", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Retriever" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Suggested Items" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Retrieved Items" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Characters" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Duration" })
        ] }),
        contextSummary.retrieverStats.map((stats, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `tw-grid tw-grid-cols-[minmax(150px,auto)_repeat(4,minmax(100px,auto))] tw-gap-3 tw-p-2 tw-items-center ${index % 2 === 0 ? "tw-bg-white tw-dark:tw-bg-gray-900" : "tw-bg-gray-50 tw-dark:tw-bg-gray-800/50"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-font-medium tw-text-sm", children: stats.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-text-xs tw-text-gray-600 tw-dark:tw-text-gray-400", children: stats.suggestedItems }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-text-xs tw-text-gray-600 tw-dark:tw-text-gray-400", children: stats.retrievedItems }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-text-xs tw-text-gray-600 tw-dark:tw-text-gray-400", children: formatChars(stats.retrieverChars) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-text-xs tw-text-gray-600 tw-dark:tw-text-gray-400", children: formatDuration(stats.duration) })
            ]
          },
          stats.name
        ))
      ] })
    ] })
  ] }) });
};

const createHotStreakStore = () => {
  let map = /* @__PURE__ */ new Map();
  const listeners = /* @__PURE__ */ new Set();
  const subscribe = (callback) => {
    listeners.add(callback);
    return () => listeners.delete(callback);
  };
  const notify = () => {
    for (const listener of listeners) {
      listener();
    }
  };
  const computeHotStreakMap = (entries) => {
    const newMap = /* @__PURE__ */ new Map();
    for (const entry of entries) {
      if ("hotStreakId" in entry.state && entry.state.hotStreakId) {
        const hotStreakId = entry.state.hotStreakId;
        if (!newMap.has(hotStreakId)) {
          newMap.set(hotStreakId, []);
        }
        newMap.get(hotStreakId).push(entry);
      }
    }
    for (const [_, hotStreakEntries] of newMap.entries()) {
      hotStreakEntries.sort((a, b) => {
        const posA = "editPosition" in a.state ? a.state.editPosition.line : a.state.position.line;
        const posB = "editPosition" in b.state ? b.state.editPosition.line : b.state.position.line;
        if (posA === posB) {
          return a.state.startedAt - b.state.startedAt;
        }
        return posA - posB;
      });
    }
    return newMap;
  };
  return {
    subscribe,
    getSnapshot: () => map,
    setEntries: (entries) => {
      map = computeHotStreakMap(entries);
      notify();
    },
    getHotStreakChainForId: (hotStreakId) => {
      if (!hotStreakId) return [];
      return map.get(hotStreakId) || [];
    }
  };
};
const hotStreakStore = createHotStreakStore();
const useHotStreakStore = () => {
  const hotStreakMap = reactExports.useSyncExternalStore(hotStreakStore.subscribe, hotStreakStore.getSnapshot);
  const getHotStreakChainForId = reactExports.useCallback(
    (hotStreakId) => hotStreakStore.getHotStreakChainForId(hotStreakId),
    []
  );
  return {
    hotStreakMap,
    setEntries: hotStreakStore.setEntries,
    getHotStreakChainForId
  };
};

const NetworkRequestSection = ({ entry }) => {
  if (!("payload" in entry.state)) {
    return null;
  }
  const modelResponse = getModelResponse(entry);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-grid tw-grid-cols-2 tw-gap-4", children: [
    modelResponse?.requestUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-col-span-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "tw-text-sm tw-font-medium tw-mb-2", children: "Request URL" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-bg-gray-100 tw-dark:tw-bg-gray-800 tw-p-3 tw-rounded tw-text-xs tw-max-h-60 tw-overflow-y-auto", children: modelResponse.requestUrl })
    ] }),
    modelResponse?.requestHeaders && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-col-span-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "tw-text-sm tw-font-medium tw-mb-2", children: "Request Headers" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-bg-gray-100 tw-dark:tw-bg-gray-800 tw-p-3 tw-rounded tw-text-xs tw-max-h-160 tw-overflow-y-auto", children: Object.entries(modelResponse.requestHeaders).map(([key, value]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tw-font-medium", children: [
          key,
          ":"
        ] }),
        " ",
        key.toLowerCase() === "authorization" ? "[REDACTED]" : value
      ] }, key)) })
    ] }),
    modelResponse?.requestBody && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-col-span-2 tw-mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(JsonViewer, { data: modelResponse.requestBody, title: "Request Body", maxHeight: "80" }) })
  ] });
};
const NetworkResponseSection = ({ entry }) => {
  if (!("payload" in entry.state)) {
    return null;
  }
  const modelResponse = getSuccessModelResponse(entry);
  const startTime = getStartTime(entry);
  const detailedTimingInfo = getDetailedTimingInfo(entry);
  const hotStreakId = getHotStreakId(entry);
  const { getHotStreakChainForId } = useHotStreakStore();
  const hotStreakChainStartEntry = getHotStreakChainForId(hotStreakId).find(
    (entry2) => getHotStreakChunks(entry2)
  );
  const hotStreakChunks = hotStreakChainStartEntry ? getHotStreakChunks(hotStreakChainStartEntry) : void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-grid tw-grid-cols-2 tw-gap-4", children: [
    modelResponse?.responseHeaders && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-col-span-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "tw-text-sm tw-font-medium tw-mb-2", children: "Response Headers" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-bg-gray-100 tw-dark:tw-bg-gray-800 tw-p-3 tw-rounded tw-text-xs tw-max-h-60 tw-overflow-y-auto", children: Object.entries(modelResponse.responseHeaders).map(([key, value]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tw-font-medium", children: [
          key,
          ":"
        ] }),
        " ",
        key.toLowerCase() === "authorization" ? "[REDACTED]" : value
      ] }, key)) })
    ] }),
    hotStreakChunks && startTime && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-col-span-2 tw-mt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "tw-text-sm tw-font-medium tw-mb-2", children: "Hot Streak Chunks" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-grid tw-grid-cols-[auto_1fr] tw-gap-2 tw-bg-gray-100 tw-dark:tw-bg-gray-800 tw-p-3 tw-rounded tw-text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-font-medium", children: "Time" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-font-medium", children: "Prediction" }),
        hotStreakChunks.filter((chunk) => chunk.prediction.trim() !== "").map((chunk, index, filteredChunks) => {
          const timeFromStart = Math.round(chunk.loadedAt - startTime);
          let timeFromPrev;
          if (index === 0) {
            timeFromPrev = detailedTimingInfo.details.find(
              (p) => p.label === PhaseNames.Network
            )?.valueMs ?? 0;
          } else {
            timeFromPrev = Math.round(
              chunk.loadedAt - filteredChunks[index - 1].loadedAt
            );
          }
          const chunkKey = `chunk-${chunk.prediction.slice(
            0,
            10
          )}-${timeFromStart}`;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(React.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-font-mono tw-pr-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tw-text-gray-500", children: [
                timeFromStart,
                "ms"
              ] }),
              index > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tw-text-gray-400 tw-ml-2", children: [
                "(+",
                timeFromPrev,
                "ms)"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-whitespace-pre-wrap tw-pb-2 tw-border-b tw-border-gray-300 tw-dark:tw-border-gray-600", children: chunk.prediction })
          ] }, chunkKey);
        })
      ] })
    ] }),
    hotStreakChunks && hotStreakChunks.length > 0 && hotStreakChunks[hotStreakChunks.length - 1]?.fullPrediction && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-col-span-2 tw-mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "tw-text-sm tw-font-medium tw-mb-2", children: "Complete Prediction" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-bg-gray-50 tw-dark:tw-bg-gray-700 tw-p-3 tw-rounded tw-text-xs tw-whitespace-pre-wrap tw-border tw-border-green-200 tw-dark:tw-border-green-800", children: hotStreakChunks[hotStreakChunks.length - 1].fullPrediction })
    ] }),
    modelResponse?.responseBody && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-col-span-2 tw-mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      JsonViewer,
      {
        data: modelResponse.responseBody,
        title: "Full Response Body",
        maxHeight: "80"
      }
    ) })
  ] });
};

const PromptSection = ({ entry }) => {
  const [isModalOpen, setIsModalOpen] = reactExports.useState(false);
  const [copySuccess, setCopySuccess] = reactExports.useState(false);
  const promptTextRef = reactExports.useRef(null);
  const modelResponse = getModelResponse(entry);
  const requestBody = modelResponse?.requestBody;
  const formattedPrompt = formatPrompt();
  const handleKeyDown = reactExports.useCallback(
    (event) => {
      if (event.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    },
    [isModalOpen]
  );
  reactExports.useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isModalOpen, handleKeyDown]);
  const handleCopyPrompt = () => {
    if (formattedPrompt) {
      navigator.clipboard.writeText(formattedPrompt).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2e3);
      }).catch((err) => console.error("Failed to copy text: ", err));
    }
  };
  function formatPrompt() {
    if (!requestBody) {
      return "Prompt is only available for loaded requests";
    }
    try {
      if ("messages" in requestBody && Array.isArray(requestBody.messages)) {
        return requestBody.messages.map((message) => {
          if ("role" in message && typeof message.role === "string") {
            const content = "content" in message && message.content !== void 0 ? String(message.content) : "No content";
            return content;
          }
          if ("speaker" in message && typeof message.speaker === "string") {
            const text = "text" in message && message.text !== void 0 ? String(message.text) : "No content";
            return text;
          }
          return JSON.stringify(message);
        }).join("\n\n");
      }
      if ("prompt" in requestBody && requestBody.prompt) {
        return String(requestBody.prompt);
      }
      const possiblePromptFields = ["text", "content", "userMessage", "input"];
      for (const field of possiblePromptFields) {
        if (field in requestBody && requestBody[field] !== void 0 && requestBody[field] !== null) {
          return String(requestBody[field]);
        }
      }
      if ("body" in requestBody && requestBody.body) {
        if (typeof requestBody.body === "string") {
          return requestBody.body;
        }
        if (typeof requestBody.body === "object" && requestBody.body !== null && "content" in requestBody.body) {
          return String(requestBody.body.content);
        }
      }
      return Object.entries(requestBody).filter(([_, value]) => value !== void 0).map(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          return `${key}: [Object]`;
        }
        return `${key}: ${value}`;
      }).join("\n");
    } catch (error) {
      console.error("Error formatting prompt:", error);
      return "Error formatting prompt. See console for details.";
    }
  }
  if (!modelResponse?.requestBody) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-mb-4 tw-flex tw-flex-col tw-h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-flex tw-justify-end tw-items-center tw-mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-flex tw-space-x-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-text-xs tw-text-gray-600", children: "Prompt is only available for loaded requests" }) }) }) });
  }
  const promptTextClass = "tw-bg-gray-50 tw-dark:tw-bg-gray-800 tw-p-4 tw-rounded tw-text-xs tw-font-mono tw-border-0 tw-m-0 tw-text-gray-800 dark:tw-text-gray-200 tw-leading-relaxed tw-whitespace-pre-wrap tw-h-full tw-overflow-y-auto";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-mb-4 tw-flex tw-flex-col tw-h-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-flex tw-justify-end tw-items-center tw-mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-space-x-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleCopyPrompt,
            className: "tw-text-xs tw-text-gray-600 hover:tw-text-gray-800 dark:tw-text-gray-400 dark:hover:tw-text-gray-200 tw-rounded tw-px-2 tw-py-1 tw-bg-gray-100 hover:tw-bg-gray-200 dark:tw-bg-gray-700 dark:hover:tw-bg-gray-600 tw-transition-colors tw-duration-150",
            title: "Copy prompt to clipboard",
            "aria-label": "Copy prompt to clipboard",
            children: copySuccess ? "Copied!" : "Copy"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setIsModalOpen(true),
            className: "tw-text-xs tw-text-gray-600 hover:tw-text-gray-800 dark:tw-text-gray-400 dark:hover:tw-text-gray-200 tw-rounded tw-px-2 tw-py-1 tw-bg-gray-100 hover:tw-bg-gray-200 dark:tw-bg-gray-700 dark:hover:tw-bg-gray-600 tw-transition-colors tw-duration-150",
            title: "View in fullscreen",
            "aria-label": "View prompt in fullscreen",
            children: "Fullscreen"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "tw-border tw-border-gray-200 dark:tw-border-gray-700 tw-rounded-md tw-max-h-100 tw-overflow-y-auto",
          role: "region",
          "aria-label": "Prompt content",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { ref: promptTextRef, className: promptTextClass, children: formattedPrompt })
        }
      )
    ] }),
    isModalOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "tw-fixed tw-inset-0 tw-z-50 tw-flex tw-items-center tw-justify-center tw-p-4 tw-bg-black tw-bg-opacity-80 tw-backdrop-blur-sm tw-transition-opacity tw-duration-300",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "modal-title",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-bg-white tw-dark:tw-bg-gray-900 tw-rounded-lg tw-shadow-xl tw-w-full tw-h-full tw-max-w-screen-xl tw-max-h-screen tw-flex tw-flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-justify-between tw-items-center tw-p-4 tw-border-b tw-border-gray-200 tw-dark:tw-border-gray-700", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                id: "modal-title",
                className: "tw-text-lg tw-font-medium tw-text-gray-900 dark:tw-text-gray-100",
                children: "Prompt Details"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-space-x-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handleCopyPrompt,
                  className: "tw-flex tw-items-center tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-rounded-md tw-bg-gray-100 hover:tw-bg-gray-200 tw-text-gray-700 dark:tw-bg-gray-700 dark:hover:tw-bg-gray-600 dark:tw-text-gray-200 tw-transition-colors tw-duration-150",
                  "aria-label": "Copy prompt to clipboard",
                  children: copySuccess ? "Copied!" : "Copy prompt"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setIsModalOpen(false),
                  className: "tw-flex tw-items-center tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-rounded-md tw-bg-gray-100 hover:tw-bg-gray-200 tw-text-gray-700 dark:tw-bg-gray-700 dark:hover:tw-bg-gray-600 dark:tw-text-gray-200 tw-transition-colors tw-duration-150",
                  "aria-label": "Close modal",
                  children: "Close (Esc)"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-flex-grow tw-overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-h-full tw-overflow-auto tw-rounded-md tw-bg-gray-50 tw-dark:tw-bg-gray-800 tw-border tw-border-gray-200 dark:tw-border-gray-700", children: /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "tw-whitespace-pre-wrap tw-font-mono tw-text-sm tw-p-5 tw-m-0 tw-h-full tw-overflow-y-auto tw-text-gray-800 dark:tw-text-gray-200 tw-leading-relaxed", children: formattedPrompt }) }) })
        ] })
      }
    )
  ] });
};

const RenderOutputSection = ({ entry }) => {
  const { renderOutput } = AutoeditDataSDK.extractAutoeditData(entry);
  const [expanded, setExpanded] = reactExports.useState(false);
  const toggleExpand = reactExports.useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);
  if (!renderOutput) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-p-4 tw-bg-gray-50 tw-dark:tw-bg-gray-800/50 tw-rounded-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "tw-text-sm tw-text-gray-500 tw-dark:tw-text-gray-400", children: "No render output information available" }) });
  }
  const isImageType = renderOutput.type === "image" && "imageData" in renderOutput;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-p-4 tw-bg-gray-50 tw-dark:tw-bg-gray-800/50 tw-rounded-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-justify-between tw-items-center tw-mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "tw-text-md tw-font-medium", children: "Render Output" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "tw-text-sm tw-text-blue-500 hover:tw-underline",
          onClick: toggleExpand,
          children: expanded ? "Collapse" : "Expand Raw Data"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-gap-2 tw-mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-text-sm tw-font-medium tw-text-gray-600 tw-dark:tw-text-gray-300", children: "Type:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-px-2 tw-py-0.5 tw-bg-blue-100 tw-dark:tw-bg-blue-900/30 tw-rounded tw-text-sm tw-text-blue-800 tw-dark:tw-text-blue-300", children: renderOutput.type })
    ] }),
    isImageType && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-mt-4 tw-mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "tw-text-sm tw-font-medium tw-mb-2", children: "Preview:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-border tw-border-gray-200 tw-dark:tw-border-gray-700 tw-rounded tw-p-2 tw-bg-white tw-dark:tw-bg-gray-900", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: renderOutput.imageData.light,
            className: "tw-block tw-dark:tw-hidden tw-max-w-full tw-h-auto tw-rounded tw-shadow-sm",
            alt: "Light theme suggestion preview"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: renderOutput.imageData.dark,
            className: "tw-hidden tw-dark:tw-block tw-max-w-full tw-h-auto tw-rounded tw-shadow-sm",
            alt: "Dark theme suggestion preview"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-mt-2 tw-text-xs tw-text-gray-500 tw-dark:tw-text-gray-400", children: [
        "Position: Line ",
        renderOutput.imageData.position.line + 1,
        ", Column",
        " ",
        renderOutput.imageData.position.column + 1
      ] })
    ] }),
    expanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "tw-text-sm tw-font-medium tw-mb-2", children: "Raw Data:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "tw-bg-gray-100 tw-dark:tw-bg-gray-800/80 tw-p-2 tw-rounded tw-text-xs tw-overflow-auto tw-max-h-[400px]", children: JSON.stringify(renderOutput, null, 2) })
    ] })
  ] });
};

const TimelineSection = ({ entry }) => {
  const [isTooltipVisible, setIsTooltipVisible] = reactExports.useState(false);
  const phases = extractPhaseInfo(entry);
  const segments = createTimelineSegments(phases);
  const segmentWidths = calculateTimelineWidths(segments);
  const totalPredictionDuration = calculateTotalDuration(phases, "Suggested");
  const totalDuration = calculateTotalDuration(phases);
  const { upstreamLatency, gatewayLatency } = getNetworkLatencyInfo(entry);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-flex-col tw-gap-y-8", children: [
    totalPredictionDuration > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-items-center tw-gap-2 tw-text-sm tw-font-medium tw-p-3 tw-bg-gray-100 tw-dark:tw-bg-gray-800 tw-rounded-md tw-shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tw-text-base", children: [
        "Total suggestion latency:",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-font-bold", children: formatLatency(totalPredictionDuration) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-relative tw-inline-block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CircleHelp,
          {
            className: "tw-h-4 tw-w-4 tw-text-gray-500 tw-cursor-help",
            onMouseEnter: () => setIsTooltipVisible(true),
            onMouseLeave: () => setIsTooltipVisible(false)
          }
        ),
        isTooltipVisible && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-absolute tw-left-1/2 tw-transform tw--translate-x-1/2 tw-top-6 tw-z-20 tw-w-64 tw-rounded-md tw-shadow-lg tw-bg-gray-800 tw-p-3 tw-text-xs tw-text-white", children: "Total prediction duration is the time from start until the prediction was suggested to the user (including the suggested phase). Post-suggestion phases (read, accepted, rejected) are not included." })
      ] })
    ] }),
    segments.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-flex tw-h-12 tw-w-full tw-rounded-lg tw-overflow-hidden tw-shadow-sm", children: segments.map((segment, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `${segment.color} tw-h-full tw-flex tw-items-center tw-justify-center tw-relative tw-border-r tw-border-white dark:tw-border-gray-800`,
          style: { width: `${segmentWidths[index]}%` },
          title: `${segment.startPhaseName} → ${segment.name}: ${formatLatency(
            segment.duration
          )}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-text-xxs tw-font-medium tw-text-white tw-drop-shadow-md", children: formatLatency(segment.duration) })
        },
        createSegmentKey(segment)
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-justify-between tw-text-xs tw-text-gray-500 tw-px-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Start" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Total: ",
          formatLatency(totalDuration)
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "tw-text-base tw-font-medium", children: "Phase Details" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-border tw-border-gray-200 tw-dark:tw-border-gray-700 tw-rounded-lg tw-overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-grid tw-grid-cols-[2rem_minmax(120px,auto)_minmax(140px,auto)_minmax(140px,auto)] tw-gap-3 tw-p-2 tw-bg-gray-100 tw-dark:tw-bg-gray-800 tw-font-medium tw-text-xs tw-text-gray-700 tw-dark:tw-text-gray-300 tw-border-b tw-border-gray-200 tw-dark:tw-border-gray-700", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Phase" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "From Start" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Phase Duration" })
        ] }),
        phases.map((phase, index) => {
          const phaseDuration = index > 0 ? (phase.time || 0) - (phases[index - 1].time || 0) : 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `tw-grid tw-grid-cols-[2rem_minmax(120px,auto)_minmax(140px,auto)_minmax(140px,auto)] tw-gap-3 tw-p-2 tw-items-center ${index > 0 ? "tw-border-t tw-border-gray-200 tw-dark:tw-border-gray-700" : ""} ${index % 2 === 0 ? "tw-bg-gray-50 tw-dark:tw-bg-gray-800/50" : ""}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-flex tw-justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `${getPhaseColor(
                      phase.name
                    )} tw-w-4 tw-h-4 tw-rounded-md tw-flex-shrink-0`
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-font-medium tw-text-sm", children: phase.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-text-xs tw-text-gray-600 tw-dark:tw-text-gray-400", children: index === 0 ? "—" : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-font-medium", children: formatLatency((phase?.time ?? 0) - (phases[0]?.time ?? 0)) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-text-xs tw-text-gray-600 tw-dark:tw-text-gray-400", children: index === 0 ? "—" : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-font-medium", children: formatLatency(phaseDuration) }) })
              ]
            },
            createPhaseKey(phase)
          );
        })
      ] })
    ] }),
    (upstreamLatency !== void 0 || gatewayLatency !== void 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "tw-text-base tw-font-medium", children: "Network Latency" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-border tw-border-gray-200 tw-dark:tw-border-gray-700 tw-rounded-lg tw-overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-grid tw-grid-cols-[2rem_minmax(120px,auto)_minmax(140px,auto)_minmax(140px,auto)] tw-gap-3 tw-p-2 tw-bg-gray-100 tw-dark:tw-bg-gray-800 tw-font-medium tw-text-xs tw-text-gray-700 tw-dark:tw-text-gray-300 tw-border-b tw-border-gray-200 tw-dark:tw-border-gray-700", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Service" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Round Trip Time" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
          " "
        ] }),
        upstreamLatency !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-grid tw-grid-cols-[2rem_minmax(120px,auto)_minmax(140px,auto)_minmax(140px,auto)] tw-gap-3 tw-p-2 tw-items-center tw-bg-gray-50 tw-dark:tw-bg-gray-800/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-flex tw-justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-bg-gray-500 tw-w-4 tw-h-4 tw-rounded-md tw-flex-shrink-0" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-font-medium tw-text-sm", children: "Sourcegraph API" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-text-xs tw-text-gray-600 tw-dark:tw-text-gray-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-font-medium", children: formatLatency(upstreamLatency) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
          " "
        ] }),
        gatewayLatency !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-grid tw-grid-cols-[2rem_minmax(120px,auto)_minmax(140px,auto)_minmax(140px,auto)] tw-gap-3 tw-p-2 tw-items-center tw-bg-white tw-dark:tw-bg-gray-900", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-flex tw-justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-bg-gray-500 tw-w-4 tw-h-4 tw-rounded-md tw-flex-shrink-0" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-font-medium tw-text-sm", children: "Cody Gateway" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-text-xs tw-text-gray-600 tw-dark:tw-text-gray-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-font-medium", children: formatLatency(gatewayLatency) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
          " "
        ] })
      ] })
    ] })
  ] });
};
const createTimelineSegments = (phases) => {
  const segments = [];
  for (let i = 0; i < phases.length - 1; i++) {
    const startPhase = phases[i];
    const endPhase = phases[i + 1];
    segments.push({
      name: endPhase.name,
      startPhaseName: startPhase.name,
      startTime: startPhase.time || 0,
      endTime: endPhase.time || 0,
      duration: (endPhase.time || 0) - (startPhase.time || 0),
      color: getPhaseColor(endPhase.name)
    });
  }
  return segments;
};

const vscode = getVSCodeAPI();

const FeedbackSection = ({ entry }) => {
  const [expectedCode, setExpectedCode] = reactExports.useState("");
  const [assertions, setAssertions] = reactExports.useState("");
  const [copySuccess, setCopySuccess] = reactExports.useState(false);
  const [isJsonExpanded, setIsJsonExpanded] = reactExports.useState(false);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const codeToReplaceData = entry.state.codeToReplaceData;
  const { filePath, context, prediction, codeToRewrite } = AutoeditDataSDK.extractAutoeditData(entry);
  const { getHotStreakChainForId } = useHotStreakStore();
  if (!prediction) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-text-gray-500 tw-text-center tw-py-8", children: "Feedback is only available for loaded requests" });
  }
  const hotStreakId = getHotStreakId(entry);
  const hotStreakChainStartEntry = getHotStreakChainForId(hotStreakId).find(
    (entry2) => getHotStreakChunks(entry2)
  );
  const hotStreakChunks = hotStreakChainStartEntry ? getHotStreakChunks(hotStreakChainStartEntry) : void 0;
  const fullPrediction = hotStreakChunks?.at(-1)?.fullPrediction ?? prediction;
  const initialCodeToRewrite = hotStreakChainStartEntry ? hotStreakChainStartEntry.state.requestCodeToReplaceData.codeToRewrite : codeToRewrite;
  const feedbackJson = {
    source: "feedback",
    file_path: filePath,
    prefix: codeToReplaceData.prefixBeforeArea + codeToReplaceData.prefixInArea,
    suffix: codeToReplaceData.suffixInArea + codeToReplaceData.suffixAfterArea,
    code_to_rewrite_prefix: codeToReplaceData.codeToRewritePrefix,
    code_to_rewrite_suffix: codeToReplaceData.codeToRewriteSuffix,
    context,
    chosen: expectedCode,
    rejected: prediction,
    assertions,
    is_reviewed: false
  };
  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(feedbackJson, null, 4)).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2e3);
    }).catch((err) => console.error("Failed to copy text: ", err));
  };
  const handleSubmit = () => {
    setIsSubmitting(true);
    vscode.postMessage({
      type: "submitFeedback",
      entry,
      feedback: feedbackJson
    });
    setIsSubmitting(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Root, { className: "tw-space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { name: "expected-code", className: "tw-space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "expected-code", children: "Expected Code" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-gap-2 tw-mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setExpectedCode(fullPrediction),
            className: "tw-text-xs tw-bg-gray-100 hover:tw-bg-gray-200 dark:tw-bg-gray-700 dark:hover:tw-bg-gray-600 tw-rounded tw-px-2 tw-py-1 tw-transition-colors tw-duration-150",
            children: "Use Full Prediction"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setExpectedCode(initialCodeToRewrite),
            className: "tw-text-xs tw-bg-gray-100 hover:tw-bg-gray-200 dark:tw-bg-gray-700 dark:hover:tw-bg-gray-600 tw-rounded tw-px-2 tw-py-1 tw-transition-colors tw-duration-150",
            children: "Use Initial Code"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Control, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          id: "expected-code",
          placeholder: "Enter the code that the LLM should have generated...",
          className: "tw-min-h-[200px] tw-font-mono tw-text-sm tw-w-full tw-p-2 tw-border tw-border-gray-200 tw-dark:tw-border-gray-700 tw-rounded tw-bg-white tw-dark:tw-bg-gray-800 tw-text-gray-900 tw-dark:tw-text-gray-100",
          value: expectedCode,
          onChange: (e) => setExpectedCode(e.target.value)
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { name: "assertions", className: "tw-space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "assertions", children: "Assertions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Control, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          id: "assertions",
          placeholder: "Enter assertions to verify the code correctness...",
          className: "tw-min-h-[100px] tw-font-mono tw-text-sm tw-w-full tw-p-2 tw-border tw-border-gray-200 tw-dark:tw-border-gray-700 tw-rounded tw-bg-white tw-dark:tw-bg-gray-800 tw-text-gray-900 tw-dark:tw-text-gray-100",
          value: assertions,
          onChange: (e) => setAssertions(e.target.value)
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-mt-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-justify-between tw-items-center tw-mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setIsJsonExpanded(!isJsonExpanded),
            className: "tw-flex tw-items-center tw-gap-1 tw-text-sm tw-text-gray-600 hover:tw-text-gray-800 dark:tw-text-gray-400 dark:hover:tw-text-gray-200",
            children: isJsonExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "tw-w-4 tw-h-4" }),
              "Hide JSON"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "tw-w-4 tw-h-4" }),
              "Show JSON"
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleCopyJson,
              className: "tw-text-xs tw-text-gray-600 hover:tw-text-gray-800 dark:tw-text-gray-400 dark:hover:tw-text-gray-200 tw-rounded tw-px-2 tw-py-1 tw-bg-gray-100 hover:tw-bg-gray-200 dark:tw-bg-gray-700 dark:hover:tw-bg-gray-600 tw-transition-colors tw-duration-150",
              title: "Copy JSON to clipboard",
              "aria-label": "Copy JSON to clipboard",
              children: copySuccess ? "Copied!" : "Copy"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleSubmit,
              disabled: isSubmitting,
              className: "tw-text-xs tw-text-white tw-bg-blue-600 hover:tw-bg-blue-700 dark:tw-bg-blue-500 dark:hover:tw-bg-blue-600 tw-rounded tw-px-4 tw-py-1 tw-transition-colors tw-duration-150 disabled:tw-opacity-50 disabled:tw-cursor-not-allowed",
              title: "Submit feedback",
              "aria-label": "Submit feedback",
              children: isSubmitting ? "Submitting..." : "Submit"
            }
          )
        ] })
      ] }),
      isJsonExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "tw-bg-gray-100 tw-dark:tw-bg-gray-800 tw-p-4 tw-rounded tw-text-sm tw-font-mono tw-overflow-auto", children: JSON.stringify(feedbackJson, null, 4) })
    ] })
  ] });
};

for (const [name, language] of Object.entries(SYNTAX_HIGHLIGHTING_LANGUAGES)) {
  HighlightJS.registerLanguage(name, language);
}
function buildSideBySideLines(decorationInfo, languageId) {
  const { addedLines, removedLines, modifiedLines, unchangedLines } = decorationInfo;
  const aggregator = [];
  aggregator.push(...removedLines.map((l) => ({ ...l, sortKey: l.originalLineNumber })));
  aggregator.push(...addedLines.map((l) => ({ ...l, sortKey: l.modifiedLineNumber })));
  aggregator.push(...unchangedLines.map((l) => ({ ...l, sortKey: l.originalLineNumber })));
  aggregator.push(...modifiedLines.map((l) => ({ ...l, sortKey: l.originalLineNumber })));
  aggregator.sort((a, b) => a.sortKey - b.sortKey);
  return aggregator.map((line) => {
    switch (line.type) {
      case "removed":
        return buildRemovedSideBySide(line, languageId);
      case "added":
        return buildAddedSideBySide(line, languageId);
      case "unchanged":
        return buildUnchangedSideBySide(line, languageId);
      case "modified":
        return buildModifiedSideBySide(line, languageId);
    }
  });
}
function buildRemovedSideBySide(line, languageId) {
  const text = line.text;
  const leftHl = highlightLine(text, languageId);
  return {
    left: {
      html: leftHl,
      lineNumber: line.originalLineNumber,
      type: "removed"
    },
    right: {
      html: "",
      lineNumber: null,
      type: "empty"
    }
  };
}
function buildAddedSideBySide(line, languageId) {
  const text = line.text;
  const rightHl = highlightLine(text, languageId);
  return {
    left: {
      html: "",
      lineNumber: null,
      type: "empty"
    },
    right: {
      html: rightHl,
      lineNumber: line.modifiedLineNumber,
      type: "added"
    }
  };
}
function buildUnchangedSideBySide(line, languageId) {
  const text = line.text;
  const hl = highlightLine(text, languageId);
  return {
    left: {
      html: hl,
      lineNumber: line.originalLineNumber,
      type: "unchanged"
    },
    right: {
      html: hl,
      lineNumber: line.modifiedLineNumber,
      type: "unchanged"
    }
  };
}
function buildModifiedSideBySide(line, languageId) {
  const { oldText, newText, changes } = line;
  const leftLineChanges = getChangesForLine(changes, line.originalLineNumber, "original");
  const rightLineChanges = getChangesForLine(changes, line.modifiedLineNumber, "modified");
  const oldHl = highlightLine(oldText, languageId);
  const newHl = highlightLine(newText, languageId);
  const decoratedLeft = decorateSyntaxHighlightedHTML(oldHl, leftLineChanges, "original");
  const decoratedRight = decorateSyntaxHighlightedHTML(newHl, rightLineChanges, "modified");
  return {
    left: {
      html: decoratedLeft,
      lineNumber: line.originalLineNumber,
      type: "modified"
    },
    right: {
      html: decoratedRight,
      lineNumber: line.modifiedLineNumber,
      type: "modified"
    }
  };
}
function getChangesForLine(allChanges, lineNumber, side) {
  return allChanges.map((change) => {
    const sideRange = side === "original" ? change.originalRange : change.modifiedRange;
    if (sideRange.start.line > lineNumber || sideRange.end.line < lineNumber) {
      return null;
    }
    const c = { ...change };
    const r = side === "original" ? { ...c.originalRange } : { ...c.modifiedRange };
    r.start.character = Math.max(0, r.start.character);
    r.end.character = Math.max(r.start.character, r.end.character);
    if (side === "original") {
      c.originalRange = r;
    } else {
      c.modifiedRange = r;
    }
    return c;
  }).filter(Boolean);
}
function highlightLine(text, languageId) {
  if (!text) return "";
  try {
    const result = HighlightJS.highlight(text, { language: languageId });
    return result.value;
  } catch (e) {
    return escapeHTML(text);
  }
}
function decorateSyntaxHighlightedHTML(hljsHtml, changes, side) {
  if (!changes || changes.length === 0) {
    return hljsHtml;
  }
  const sorted = [...changes].sort((a, b) => {
    const aRange = side === "original" ? a.originalRange : a.modifiedRange;
    const bRange = side === "original" ? b.originalRange : b.modifiedRange;
    return aRange.start.character - bRange.start.character;
  });
  const parser = new DOMParser();
  const doc = parser.parseFromString(`<div>${hljsHtml}</div>`, "text/html");
  let globalOffset = 0;
  let changeIndex = 0;
  let currentChange = sorted[0] || null;
  function walk(node) {
    if (node.nodeType !== Node.TEXT_NODE) {
      const children2 = Array.from(node.childNodes);
      for (const child of children2) {
        walk(child);
      }
      return;
    }
    const nodeText = node.textContent ?? "";
    const nodeLength = nodeText.length;
    const fragment = doc.createDocumentFragment();
    let consumed = 0;
    while (consumed < nodeLength) {
      if (!currentChange) {
        const leftover = nodeText.slice(consumed);
        fragment.appendChild(doc.createTextNode(leftover));
        globalOffset += leftover.length;
        consumed = nodeLength;
        break;
      }
      const sideRange = side === "original" ? currentChange.originalRange : currentChange.modifiedRange;
      const startOffset = sideRange.start.character;
      const endOffset = sideRange.end.character;
      if (globalOffset + consumed >= endOffset) {
        changeIndex++;
        currentChange = sorted[changeIndex] || null;
        continue;
      }
      if (globalOffset + consumed < startOffset) {
        const sliceEnd = Math.min(startOffset - (globalOffset + consumed), nodeLength - consumed);
        const textPortion = nodeText.slice(consumed, consumed + sliceEnd);
        fragment.appendChild(doc.createTextNode(textPortion));
        consumed += textPortion.length;
      } else {
        const sliceEnd = Math.min(endOffset - (globalOffset + consumed), nodeLength - consumed);
        const changedPortion = nodeText.slice(consumed, consumed + sliceEnd);
        consumed += sliceEnd;
        const span = doc.createElement("span");
        if (currentChange.type === "insert" && side === "modified") {
          span.classList.add("tw-bg-green-200");
        } else if (currentChange.type === "delete" && side === "original") {
          span.classList.add("tw-bg-red-200");
        }
        span.textContent = changedPortion;
        fragment.appendChild(span);
      }
    }
    globalOffset += consumed;
    node.replaceWith(fragment);
  }
  const children = Array.from(doc.childNodes);
  for (const child of children) {
    walk(child);
  }
  const wrapper = doc.querySelector("div");
  return wrapper ? wrapper.innerHTML : hljsHtml;
}
function escapeHTML(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

for (const [name, language] of Object.entries(SYNTAX_HIGHLIGHTING_LANGUAGES)) {
  HighlightJS.registerLanguage(name, language);
}
const SideBySideDiff = ({ sideBySideDiffDecorationInfo, languageId, codeToRewrite, prediction }) => {
  const sideBySideLines = buildSideBySideLines(sideBySideDiffDecorationInfo, languageId);
  const [leftCopySuccess, setLeftCopySuccess] = reactExports.useState(false);
  const [rightCopySuccess, setRightCopySuccess] = reactExports.useState(false);
  const handleCopy = (text, setSuccess) => {
    if (text) {
      navigator.clipboard.writeText(text).then(() => {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2e3);
      }).catch((err) => console.error("Failed to copy text: ", err));
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "tw-min-w-full tw-text-sm diff-table tw-font-mono", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "tw-border-b tw-border-gray-300 tw-bg-gray-50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "tw-w-12 tw-text-right tw-pr-2 tw-sticky tw-left-0 tw-z-10 tw-bg-gray-50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "tw-w-[calc(50%-24px)] tw-text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Code To Rewrite" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => handleCopy(codeToRewrite, setLeftCopySuccess),
            className: "tw-text-xs tw-text-gray-600 hover:tw-text-gray-800 dark:tw-text-gray-400 dark:hover:tw-text-gray-200 tw-rounded tw-px-2 tw-py-1 tw-bg-gray-100 hover:tw-bg-gray-200 dark:tw-bg-gray-700 dark:hover:tw-bg-gray-600 tw-transition-colors tw-duration-150",
            title: "Copy code to rewrite",
            "aria-label": "Copy code to rewrite",
            children: leftCopySuccess ? "Copied!" : "Copy"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "tw-w-12 tw-text-right tw-pr-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "tw-w-[calc(50%-24px)] tw-text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Prediction" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => handleCopy(prediction, setRightCopySuccess),
            className: "tw-text-xs tw-text-gray-600 hover:tw-text-gray-800 dark:tw-text-gray-400 dark:hover:tw-text-gray-200 tw-rounded tw-px-2 tw-py-1 tw-bg-gray-100 hover:tw-bg-gray-200 dark:tw-bg-gray-700 dark:hover:tw-bg-gray-600 tw-transition-colors tw-duration-150",
            title: "Copy prediction",
            "aria-label": "Copy prediction",
            children: rightCopySuccess ? "Copied!" : "Copy"
          }
        )
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: sideBySideLines.map((line, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "tr",
      {
        className: "tw-align-top tw-border-b tw-last:border-b-0 tw-border-gray-200",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "tw-text-gray-400 tw-text-right tw-pr-2 tw-sticky tw-left-0 tw-z-10 tw-bg-white", children: line.left.lineNumber ?? "" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "td",
            {
              className: `${lineTypeToTdClass(
                line.left.type
              )} tw-px-2 tw-py-1 tw-whitespace-pre tw-overflow-visible`,
              dangerouslySetInnerHTML: { __html: line.left.html ?? "" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "tw-text-gray-400 tw-text-right tw-pr-2", children: line.right.lineNumber ?? "" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "td",
            {
              className: `${lineTypeToTdClass(
                line.right.type
              )} tw-px-2 tw-py-1 tw-whitespace-pre tw-overflow-visible`,
              dangerouslySetInnerHTML: { __html: line.right.html ?? "" }
            }
          )
        ]
      },
      index
    )) })
  ] }) });
};
function lineTypeToTdClass(type) {
  switch (type) {
    case "added":
      return "tw-bg-green-50";
    case "removed":
      return "tw-bg-red-50";
    case "modified":
      return "tw-bg-yellow-50";
    default:
      return "";
  }
}

const AutoeditDetailView = ({ entries, entry, onPrevious, onNext, onClose, hasPrevious, hasNext }) => {
  const [activeTab, setActiveTab] = reactExports.useState("timeline");
  const { phase, fileName, discardReason, position, prediction, codeToRewrite, triggerKind } = AutoeditDataSDK.extractAutoeditData(entry);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-flex-col tw-gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-flex-col tw-gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-items-center tw-justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-font-mono tw-text-sm tw-bg-gray-100 tw-dark:tw-bg-gray-800 tw-px-2 tw-py-0.5 tw-rounded", children: entry.state.requestId }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: getStatusColor(phase), children: phase }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-text-xs tw-text-gray-500 tw-dark:tw-text-gray-400", children: triggerKind })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "icon",
              variant: "outline",
              onClick: onPrevious,
              disabled: !hasPrevious,
              className: "tw-h-8 tw-w-8",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "tw-h-4 tw-w-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-sr-only", children: "Previous" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "icon",
              variant: "outline",
              onClick: onNext,
              disabled: !hasNext,
              className: "tw-h-8 tw-w-8",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "tw-h-4 tw-w-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-sr-only", children: "Next" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "icon",
              variant: "outline",
              onClick: onClose,
              title: "Close detail view",
              className: "tw-h-8 tw-w-8",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "tw-h-4 tw-w-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-sr-only", children: "Close" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "tw-text-lg tw-font-semibold tw-truncate", children: [
          fileName,
          position ? `:${position?.line + 1}:${position?.character + 1}` : ""
        ] }),
        entry.sideBySideDiffDecorationInfo && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          SideBySideDiff,
          {
            sideBySideDiffDecorationInfo: entry.sideBySideDiffDecorationInfo,
            languageId: entry.state.payload.languageId,
            codeToRewrite: codeToRewrite || "",
            prediction: prediction || ""
          }
        ) }),
        !entry.sideBySideDiffDecorationInfo && prediction && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-mt-4 tw-p-4 tw-border tw-border-gray-200 tw-dark:tw-border-gray-700 tw-rounded", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "tw-text-md tw-font-semibold tw-mb-3", children: "Prediction Text" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "tw-bg-gray-100 tw-dark:tw-bg-gray-800 tw-p-3 tw-rounded tw-text-xs tw-overflow-auto tw-max-h-[200px]", children: prediction })
        ] }),
        !entry.sideBySideDiffDecorationInfo && codeToRewrite && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-mt-4 tw-p-4 tw-border tw-border-gray-200 tw-dark:tw-border-gray-700 tw-rounded", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "tw-text-md tw-font-semibold tw-mb-3", children: "Code to Rewrite" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "tw-bg-gray-100 tw-dark:tw-bg-gray-800 tw-p-3 tw-rounded tw-text-xs tw-overflow-auto tw-max-h-[200px]", children: codeToRewrite })
        ] })
      ] })
    ] }),
    discardReason && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-bg-red-50 tw-dark:tw-bg-red-900/20 tw-p-4 tw-rounded-md tw-border tw-border-red-200 tw-dark:tw-border-red-900/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-items-center tw-gap-2 tw-mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "tw-h-4 tw-w-4 tw-text-red-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "tw-font-medium tw-text-red-800 tw-dark:tw-text-red-300", children: "Request Discarded" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "tw-text-sm tw-text-red-700 tw-dark:tw-text-red-400", children: [
        "Reason: ",
        discardReason
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Root2, { value: activeTab, onValueChange: setActiveTab, className: "tw-w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-border-b tw-border-gray-200 tw-dark:tw-border-gray-700", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(List, { className: "tw-flex tw-flex-wrap tw--mb-px", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabButton, { value: "timeline", activeTab, children: "Timeline" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabButton, { value: "prompt", activeTab, children: "Prompt" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabButton, { value: "code-to-rewrite-data", activeTab, children: "Code To Rewrite Data" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabButton, { value: "context", activeTab, children: "Context" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabButton, { value: "render-output", activeTab, children: "Render Output" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabButton, { value: "network-request", activeTab, children: "Request" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabButton, { value: "network-response", activeTab, children: "Response" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabButton, { value: "config", activeTab, children: "Config" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabButton, { value: "feedback", activeTab, children: "Feedback" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-pt-4 tw-p-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Content, { value: "timeline", className: "tw-space-y-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineSection, { entry }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Content, { value: "prompt", className: "tw-space-y-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PromptSection, { entry }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Content, { value: "context", className: "tw-space-y-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ContextInfoSection, { entry }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Content, { value: "render-output", className: "tw-space-y-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RenderOutputSection, { entry }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Content, { value: "network-request", className: "tw-space-y-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NetworkRequestSection, { entry }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Content, { value: "network-response", className: "tw-space-y-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NetworkResponseSection, { entry }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Content, { value: "config", className: "tw-space-y-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AutoeditsConfigSection, { entry }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Content, { value: "code-to-rewrite-data", className: "tw-space-y-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CodeToRewriteDataSection, { entry }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Content, { value: "feedback", className: "tw-space-y-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FeedbackSection, { entry }) })
      ] })
    ] })
  ] });
};
const TabButton = ({
  value,
  activeTab,
  children
}) => {
  const isActive = value === activeTab;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      value,
      className: `
                tw-px-4 tw-py-2 tw-font-medium tw-text-sm
                tw-border-b-2 tw-transition-colors
                ${isActive ? "tw-border-blue-500 tw-text-blue-600 tw-dark:tw-border-blue-400 tw-dark:tw-text-blue-400" : "tw-border-transparent tw-text-gray-500 tw-dark:tw-text-gray-400 hover:tw-text-gray-700 hover:tw-border-gray-300 dark:hover:tw-text-gray-300"}
            `,
      children
    }
  );
};

const getFriendlyRenderOutputType = (type) => {
  if (!type) {
    return null;
  }
  switch (type) {
    case "image":
      return "Image";
    case "decorations":
      return "Decoration";
    case "completion-with-decorations":
      return "Completion/Decoration";
    case "completion":
      return "Completion";
    default:
      return null;
  }
};
const EntryHeader = ({ phase, triggerKind, renderOutputType, timingInfo, onToggleDetailedTiming }) => {
  const renderType = getFriendlyRenderOutputType(renderOutputType);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-items-center tw-justify-between tw-w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: getStatusColor(phase), children: phase }),
      renderType && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-text-xs tw-px-2 tw-py-0.5 tw-bg-gray-100 tw-dark:tw-bg-gray-700 tw-rounded", children: renderType }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-text-xs tw-text-gray-500 tw-dark:tw-text-gray-400", children: triggerKind })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-text-xs tw-text-gray-500 tw-dark:tw-text-gray-400", children: "Total:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "tw-text-xs tw-font-medium tw-text-gray-600 tw-dark:tw-text-gray-300 hover:tw-underline tw-text-left",
          onClick: (e) => {
            e.stopPropagation();
            onToggleDetailedTiming();
          },
          title: "Click to see detailed timing",
          children: timingInfo.predictionDuration || "—"
        }
      )
    ] })
  ] });
};
const DetailedTiming = ({ timingInfo }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-bg-gray-50 tw-dark:tw-bg-gray-800/50 tw-rounded tw-p-2 tw-my-1", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-text-xs tw-font-medium tw-text-gray-700 tw-dark:tw-text-gray-300 tw-mb-1", children: "Detailed Timing" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-grid tw-grid-cols-2 tw-gap-x-4 tw-gap-y-1", children: timingInfo.details.map((detail) => /* @__PURE__ */ jsxRuntimeExports.jsxs(React.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-text-xs tw-text-gray-500 tw-dark:tw-text-gray-400", children: [
      detail.label,
      ":"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-text-xs tw-font-mono tw-text-gray-600 tw-dark:tw-text-gray-300", children: detail.value })
  ] }, `${detail.label}-${detail.value}`)) })
] });
const FileInfo = ({ fileName, positionInfo, inferenceTime, envoyUpstreamServiceTime }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-items-center tw-justify-between tw-w-full tw-text-sm tw-text-gray-700 tw-dark:tw-text-gray-300", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-flex tw-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-font-medium", children: `${fileName} ${positionInfo ? `:${positionInfo}` : ""}` }) }),
  inferenceTime && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-text-xs tw-text-gray-500 tw-dark:tw-text-gray-400", children: "Inference:" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-text-xs tw-font-medium tw-text-gray-600 tw-dark:tw-text-gray-300", children: inferenceTime })
  ] }),
  !inferenceTime && envoyUpstreamServiceTime && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-text-xs tw-text-gray-500 tw-dark:tw-text-gray-400", children: "Envoy Latency:" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-text-xs tw-font-medium tw-text-gray-600 tw-dark:tw-text-gray-300", children: envoyUpstreamServiceTime })
  ] })
] });
const CodePreview = ({ codeText }) => {
  const truncatedText = codeText.length > 80 ? codeText.substring(0, 80) + "..." : codeText;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-flex tw-flex-col tw-gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-font-mono tw-text-xs tw-text-gray-600 tw-dark:tw-text-gray-400 tw-bg-gray-50 tw-dark:tw-bg-gray-800/80 tw-px-2 tw-py-1 tw-rounded tw-whitespace-normal tw-break-all", children: truncatedText }) });
};
const AutoeditListItem = ({
  entry,
  isSelected,
  onSelect,
  hotStreakChain = []
}) => {
  const {
    phase,
    fileName,
    codeToRewrite = "",
    triggerKind,
    positionInfo,
    discardReason,
    timing,
    renderOutput,
    hotStreakId
  } = AutoeditDataSDK.extractAutoeditData(entry);
  const hasHotStreakChain = hotStreakId && hotStreakChain.length > 0;
  const [showDetailedTiming, setShowDetailedTiming] = React.useState(false);
  const [showHotStreakChain, setShowHotStreakChain] = React.useState(false);
  const cardClasses = `
        tw-border ${isSelected ? "tw-border-blue-300 tw-dark:tw-border-blue-700" : "tw-border-gray-200 tw-dark:tw-border-gray-700"}
        tw-rounded-md tw-mb-2 tw-overflow-hidden tw-cursor-pointer
        focus-visible:tw-outline-none
        ${isSelected ? "tw-bg-blue-50 tw-dark:tw-bg-blue-900/20" : "tw-bg-white tw-dark:tw-bg-gray-800 hover:tw-bg-gray-50 dark:hover:tw-bg-gray-700/50"}
    `.trim().replace(/\s+/g, " ");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cardClasses,
      onClick: () => onSelect(entry.state.requestId),
      role: "button",
      tabIndex: 0,
      onKeyDown: (e) => {
        if (e.key === "Enter" || e.key === " ") {
          onSelect(entry.state.requestId);
          e.preventDefault();
        }
      },
      onFocus: (e) => {
        if (!isSelected) {
          onSelect(entry.state.requestId);
        }
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-px-4 tw-py-3 tw-w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-grid tw-grid-cols-1 tw-w-full tw-gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EntryHeader,
          {
            phase,
            triggerKind,
            renderOutputType: renderOutput?.type,
            timingInfo: timing,
            onToggleDetailedTiming: () => setShowDetailedTiming(!showDetailedTiming)
          }
        ),
        showDetailedTiming && timing.details.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(DetailedTiming, { timingInfo: timing }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FileInfo,
          {
            fileName,
            positionInfo,
            inferenceTime: timing.inferenceTime,
            envoyUpstreamServiceTime: timing.envoyUpstreamServiceTime
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CodePreview, { codeText: codeToRewrite }),
        discardReason && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-items-center tw-gap-1 tw-text-red-600 tw-text-xs tw-mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "tw-h-3 tw-w-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: discardReason })
        ] }),
        hasHotStreakChain && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-mt-2 tw-pt-2 tw-border-t tw-border-gray-200 tw-dark:tw-border-gray-700", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-items-center tw-justify-between tw-text-xs tw-mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-items-center tw-gap-1 tw-text-gray-600 tw-dark:tw-text-gray-400", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { className: "tw-h-3 tw-w-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-font-medium", children: "Hot Streak:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "tw-font-mono tw-text-gray-500 tw-dark:tw-text-gray-500",
                  title: hotStreakId,
                  children: [
                    hotStreakId?.substring(0, 8),
                    "..."
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "tw-px-2 tw-py-0.5 tw-rounded tw-text-blue-600 tw-dark:tw-text-blue-400 tw-bg-blue-50 tw-dark:tw-bg-blue-900/20 hover:tw-bg-blue-100 dark:hover:tw-bg-blue-900/30 tw-transition-colors",
                onClick: (e) => {
                  e.stopPropagation();
                  setShowHotStreakChain(!showHotStreakChain);
                },
                children: [
                  showHotStreakChain ? "Hide Chain" : "View Chain",
                  " (",
                  hotStreakChain.length,
                  ")"
                ]
              }
            )
          ] }),
          showHotStreakChain && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-flex tw-flex-col tw-gap-1 tw-mt-2 tw-p-2 tw-bg-gray-50 tw-dark:tw-bg-gray-800/40 tw-rounded", children: hotStreakChain.map((chainEntry) => {
            const chainEntryRequestId = chainEntry.state.requestId;
            const isCurrentEntry = chainEntryRequestId === entry.state.requestId;
            const lineNumber = "editPosition" in chainEntry.state ? chainEntry.state.editPosition.line : chainEntry.state.position.line;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                disabled: isCurrentEntry,
                className: `tw-w-full tw-text-left tw-flex tw-items-center tw-justify-between tw-px-2 tw-py-1 tw-rounded tw-cursor-pointer hover:tw-bg-gray-200 dark:hover:tw-bg-gray-700/60 ${isCurrentEntry ? "tw-bg-blue-100 tw-dark:tw-bg-blue-900/40 tw-opacity-90" : "tw-bg-gray-100 tw-dark:tw-bg-gray-800"}`,
                onClick: (e) => {
                  e.stopPropagation();
                  onSelect(chainEntryRequestId);
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-flex-1 tw-items-center tw-gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-text-xs tw-font-mono tw-text-gray-500 tw-dark:tw-text-gray-400", children: chainEntryRequestId.substring(0, 6) }),
                    lineNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tw-text-xs tw-text-gray-600 tw-dark:tw-text-gray-400", children: [
                      "Line: ",
                      lineNumber
                    ] })
                  ] }),
                  !isCurrentEntry && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-text-xs tw-text-blue-600 tw-dark:tw-text-blue-400", children: "View" })
                ]
              },
              chainEntryRequestId
            );
          }) })
        ] })
      ] }) })
    }
  );
};

const EmptyState = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-p-6 tw-text-center tw-text-gray-500 tw-dark:tw-text-gray-400 tw-border tw-border-dashed tw-border-gray-200 tw-dark:tw-border-gray-700 tw-rounded-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "tw-h-12 tw-w-12 tw-mx-auto tw-mb-3 tw-text-gray-400 tw-dark:tw-text-gray-600" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No auto-edit requests recorded yet. Start typing or moving your cursor to trigger auto-edit." })
  ] });
};

const LatencyTrendGraph = ({ statsForLastNRequests }) => {
  const data = statsForLastNRequests.filter((d) => d.endToEndLatencyMs !== void 0).map((entry, index) => ({
    index,
    e2eLatency: entry.endToEndLatencyMs,
    inferenceLatency: entry.inferenceTimeMs
  })).reverse();
  const canvasRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!canvasRef.current || data.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const devicePixelRatio = window.devicePixelRatio || 1;
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    canvas.width = displayWidth * devicePixelRatio;
    canvas.height = displayHeight * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
    ctx.clearRect(0, 0, displayWidth, displayHeight);
    const width = displayWidth;
    const height = displayHeight;
    const padding = { top: 30, right: 60, bottom: 30, left: 50 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    const allLatencies = data.flatMap((d) => [
      d.e2eLatency,
      d.inferenceLatency !== void 0 ? d.inferenceLatency : 0
    ]);
    const maxLatency = Math.max(...allLatencies, 100) * 1.1;
    ctx.strokeStyle = "#888";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, height - padding.bottom);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(padding.left, height - padding.bottom);
    ctx.lineTo(width - padding.right, height - padding.bottom);
    ctx.stroke();
    ctx.fillStyle = "#888";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    const yTicks = 5;
    for (let i = 0; i <= yTicks; i++) {
      const y = padding.top + chartHeight * i / yTicks;
      const value = maxLatency - maxLatency * i / yTicks;
      ctx.fillText(`${Math.round(value)}ms`, padding.left - 5, y);
      ctx.beginPath();
      ctx.strokeStyle = "#eee";
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();
    }
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    const xStep = Math.max(1, Math.floor(data.length / 5));
    for (let i = 0; i < data.length; i += xStep) {
      const x = padding.left + chartWidth * i / (data.length - 1);
      ctx.fillText(`${data[i].index}`, x, height - padding.bottom + 5);
    }
    ctx.beginPath();
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 2;
    for (let i = 0; i < data.length; i++) {
      const x = padding.left + chartWidth * i / (data.length - 1);
      const y = padding.top + chartHeight - chartHeight * data[i].e2eLatency / maxLatency;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
    for (let i = 0; i < data.length; i++) {
      const x = padding.left + chartWidth * i / (data.length - 1);
      const y = padding.top + chartHeight - chartHeight * data[i].e2eLatency / maxLatency;
      ctx.beginPath();
      ctx.fillStyle = "#3b82f6";
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    const hasInferenceData = data.some((d) => d.inferenceLatency !== void 0);
    if (hasInferenceData) {
      ctx.beginPath();
      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 2;
      let firstPoint = true;
      for (let i = 0; i < data.length; i++) {
        if (data[i].inferenceLatency === void 0) continue;
        const x = padding.left + chartWidth * i / (data.length - 1);
        const y = padding.top + chartHeight - chartHeight * data[i].inferenceLatency / maxLatency;
        if (firstPoint) {
          ctx.moveTo(x, y);
          firstPoint = false;
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      for (let i = 0; i < data.length; i++) {
        if (data[i].inferenceLatency === void 0) continue;
        const x = padding.left + chartWidth * i / (data.length - 1);
        const y = padding.top + chartHeight - chartHeight * data[i].inferenceLatency / maxLatency;
        ctx.beginPath();
        ctx.fillStyle = "#10b981";
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    const legendY = padding.top - 15;
    ctx.beginPath();
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 2;
    ctx.moveTo(width - padding.right - 140, legendY);
    ctx.lineTo(width - padding.right - 120, legendY);
    ctx.stroke();
    ctx.fillStyle = "#333";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("E2E Latency", width - padding.right - 115, legendY + 3);
    if (hasInferenceData) {
      ctx.beginPath();
      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 2;
      ctx.moveTo(width - padding.right - 60, legendY);
      ctx.lineTo(width - padding.right - 40, legendY);
      ctx.stroke();
      ctx.fillText("Inference Latency", width - padding.right - 35, legendY + 3);
    }
  }, [data]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef, className: "tw-w-full tw-h-[400px]" });
};

const RequestMetricsSummary = ({ statsForLastNRequests, numberOfRequests }) => {
  const last20Requests = statsForLastNRequests.slice(0, 20);
  const hasEndToEndLatency = last20Requests.some((entry) => entry.endToEndLatencyMs !== void 0);
  const hasContextLoadedLatency = last20Requests.some(
    (entry) => entry.contextLoadedLatencyMs !== void 0
  );
  const hasInferenceTime = last20Requests.some((entry) => entry.inferenceTimeMs !== void 0);
  const hasEnvoyLatency = last20Requests.some((entry) => entry.envoyLatencyMs !== void 0);
  const hasNetworkLatency = last20Requests.some((entry) => entry.networkLatencyMs !== void 0);
  const hasCacheHitRate = last20Requests.some((entry) => entry.promptCacheHitRate !== void 0);
  const visibleColumns = [
    { id: "phase", label: "Phase", always: true },
    { id: "endToEnd", label: "End-to-End", visible: hasEndToEndLatency },
    { id: "contextLoaded", label: "Context Loaded", visible: hasContextLoadedLatency },
    { id: "inference", label: "Inference", visible: hasInferenceTime },
    { id: "envoy", label: "Envoy Latency", visible: hasEnvoyLatency },
    { id: "network", label: "Network", visible: hasNetworkLatency },
    { id: "cacheHit", label: "Cache Hit Rate", visible: hasCacheHitRate }
  ].filter((col) => col.always || col.visible);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "tw-text-md tw-font-medium tw-mb-2", children: [
      "Stats for the last ",
      last20Requests.length,
      " requests"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-mt-4 tw-overflow-x-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "tw-w-full tw-border-collapse tw-border tw-border-gray-200 tw-dark:tw-border-gray-700 tw-rounded-lg tw-overflow-hidden tw-shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "tw-bg-gray-100 tw-dark:tw-bg-gray-800 tw-border-b tw-border-gray-200 tw-dark:tw-border-gray-700", children: visibleColumns.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "th",
          {
            className: "tw-p-2 tw-px-4 tw-text-left tw-font-medium tw-text-xs tw-text-gray-700 tw-dark:tw-text-gray-300",
            children: col.label
          },
          col.id
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: last20Requests.map((entry, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: `${index % 2 === 0 ? "tw-bg-gray-50 tw-dark:tw-bg-gray-800/50" : "tw-bg-white tw-dark:tw-bg-gray-900"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "tw-p-2 tw-px-4 tw-border-t tw-border-gray-200 tw-dark:tw-border-gray-700 tw-font-medium tw-text-sm", children: entry.phase }),
              hasEndToEndLatency && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "tw-p-2 tw-px-4 tw-border-t tw-border-gray-200 tw-dark:tw-border-gray-700 tw-text-xs tw-text-gray-600 tw-dark:tw-text-gray-400", children: entry.endToEndLatencyMs !== void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-font-medium", children: formatLatency(entry.endToEndLatencyMs) }) : "—" }),
              hasContextLoadedLatency && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "tw-p-2 tw-px-4 tw-border-t tw-border-gray-200 tw-dark:tw-border-gray-700 tw-text-xs tw-text-gray-600 tw-dark:tw-text-gray-400", children: entry.contextLoadedLatencyMs !== void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-font-medium", children: formatLatency(entry.contextLoadedLatencyMs) }) : "—" }),
              hasInferenceTime && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "tw-p-2 tw-px-4 tw-border-t tw-border-gray-200 tw-dark:tw-border-gray-700 tw-text-xs tw-text-gray-600 tw-dark:tw-text-gray-400", children: entry.inferenceTimeMs !== void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-font-medium", children: formatLatency(entry.inferenceTimeMs) }) : "—" }),
              hasEnvoyLatency && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "tw-p-2 tw-px-4 tw-border-t tw-border-gray-200 tw-dark:tw-border-gray-700 tw-text-xs tw-text-gray-600 tw-dark:tw-text-gray-400", children: entry.envoyLatencyMs !== void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-font-medium", children: formatLatency(entry.envoyLatencyMs) }) : "—" }),
              hasNetworkLatency && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "tw-p-2 tw-px-4 tw-border-t tw-border-gray-200 tw-dark:tw-border-gray-700 tw-text-xs tw-text-gray-600 tw-dark:tw-text-gray-400", children: entry.networkLatencyMs !== void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-font-medium", children: formatLatency(entry.networkLatencyMs) }) : "—" }),
              hasCacheHitRate && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "tw-p-2 tw-px-4 tw-border-t tw-border-gray-200 tw-dark:tw-border-gray-700 tw-text-xs tw-text-gray-600 tw-dark:tw-text-gray-400", children: entry.promptCacheHitRate !== void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tw-font-medium", children: [
                entry.promptCacheHitRate.toFixed(2),
                "%"
              ] }) : "—" })
            ]
          },
          `${entry.requestId}-${index}`
        )) })
      ] }),
      numberOfRequests > last20Requests.length && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-text-xs tw-text-gray-500 tw-mt-2 tw-text-center", children: [
        "Showing ",
        last20Requests.length,
        " most recent requests out of ",
        numberOfRequests
      ] })
    ] })
  ] });
};

const formatMs = (ms) => {
  if (ms === void 0 || ms === 0) return "N/A";
  return `${ms.toFixed(0)}ms`;
};
const formatPercent = (value) => {
  if (value === void 0) return "N/A";
  return `${value.toFixed(2)}%`;
};
const END_TO_END_LATENCY_THRESHOLDS = {
  GOOD: 350,
  MODERATE: 450
};
const CONTEXT_LOADED_LATENCY_THRESHOLDS = {
  GOOD: 20,
  MODERATE: 40
};
const INFERENCE_LATENCY_THRESHOLDS = {
  GOOD: 150,
  MODERATE: 250
};
const ENVOY_LATENCY_THRESHOLDS = {
  GOOD: 35,
  MODERATE: 50
};
const NETWORK_LATENCY_THRESHOLDS = {
  GOOD: 250,
  MODERATE: 350
};
const CACHE_HIT_RATE_THRESHOLDS = {
  POOR: 60,
  GOOD: 80
};
const getLatencyBar = (value, maxValue, latencyType) => {
  if (maxValue <= 0) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-h-1" });
  const percentage = Math.min(100, value / maxValue * 100);
  let thresholds = END_TO_END_LATENCY_THRESHOLDS;
  switch (latencyType) {
    case "endToEnd":
      thresholds = END_TO_END_LATENCY_THRESHOLDS;
      break;
    case "contextLoaded":
      thresholds = CONTEXT_LOADED_LATENCY_THRESHOLDS;
      break;
    case "inference":
      thresholds = INFERENCE_LATENCY_THRESHOLDS;
      break;
    case "envoy":
      thresholds = ENVOY_LATENCY_THRESHOLDS;
      break;
    case "network":
      thresholds = NETWORK_LATENCY_THRESHOLDS;
      break;
  }
  let colorClass = "tw-bg-green-500";
  if (value > thresholds.MODERATE) {
    colorClass = "tw-bg-red-500";
  } else if (value > thresholds.GOOD) {
    colorClass = "tw-bg-yellow-500";
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-w-full tw-bg-gray-200 tw-dark:tw-bg-gray-700 tw-h-1 tw-mt-1 tw-rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `tw-h-1 tw-rounded-full ${colorClass}`,
      style: { width: `${percentage}%` }
    }
  ) });
};
const getCacheHitRateBar = (rate) => {
  let colorClass = "tw-bg-red-500";
  if (rate >= CACHE_HIT_RATE_THRESHOLDS.GOOD) {
    colorClass = "tw-bg-green-500";
  } else if (rate >= CACHE_HIT_RATE_THRESHOLDS.POOR) {
    colorClass = "tw-bg-yellow-500";
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-w-full tw-bg-gray-200 tw-dark:tw-bg-gray-700 tw-h-1 tw-mt-1 tw-rounded-full tw-overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `tw-h-1 tw-rounded-full ${colorClass}`, style: { width: `${rate}%` } }) });
};
const getCacheHitRateIndicator = (rate) => {
  let colorClass = "tw-text-red-500";
  if (rate >= CACHE_HIT_RATE_THRESHOLDS.GOOD) {
    colorClass = "tw-text-green-500";
  } else if (rate >= CACHE_HIT_RATE_THRESHOLDS.POOR) {
    colorClass = "tw-text-yellow-500";
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `${colorClass} tw-mr-1`, children: "●" });
};
const LatencyCard = ({ title, latencyData, latencyType, maxLatencyP90 }) => {
  const { p50, p75, p90 } = latencyData;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-bg-gray-100 tw-dark:tw-bg-gray-800 tw-p-4 tw-rounded tw-border tw-border-gray-200 tw-dark:tw-border-gray-700", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "tw-text-sm tw-font-medium tw-mb-3", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-space-y-3", children: [
      p50 !== void 0 && p50 > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-justify-between tw-items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-text-xs tw-text-gray-500", children: "P50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-text-xs tw-font-medium", children: formatMs(p50) })
        ] }),
        maxLatencyP90 > 0 && getLatencyBar(p50, maxLatencyP90, latencyType)
      ] }),
      p75 !== void 0 && p75 > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-justify-between tw-items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-text-xs tw-text-gray-500", children: "P75" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-text-xs tw-font-medium", children: formatMs(p75) })
        ] }),
        maxLatencyP90 > 0 && getLatencyBar(p75, maxLatencyP90, latencyType)
      ] }),
      p90 !== void 0 && p90 > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-justify-between tw-items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-text-xs tw-text-gray-500", children: "P90" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-text-xs tw-font-medium", children: formatMs(p90) })
        ] }),
        maxLatencyP90 > 0 && getLatencyBar(p90, maxLatencyP90, latencyType)
      ] })
    ] })
  ] });
};
const SessionStatsPage = ({ sessionStats, statsForLastNRequests }) => {
  if (!sessionStats) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-p-4 tw-text-center tw-text-gray-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No statistics available for this session." }) });
  }
  const hasLatencyData = (metric) => {
    const data = sessionStats[metric];
    return data && (data.p50 > 0 || data.p75 > 0 || data.p90 > 0);
  };
  const hasCacheHitRateData = () => {
    return sessionStats.meanCacheHitRate.all > 0 || sessionStats.meanCacheHitRate.suggested > 0 || sessionStats.meanCacheHitRate.readOrAccepted > 0;
  };
  const maxLatencyP90 = Math.max(
    sessionStats.endToEndLatency.p90 || 0,
    sessionStats.contextLoadedLatency.p90 || 0,
    sessionStats.inferenceLatency.p90 || 0,
    sessionStats.envoyLatency.p90 || 0,
    sessionStats.networkLatency.p90 || 0
  );
  const hasEndToEndLatency = hasLatencyData("endToEndLatency");
  const hasContextLoadedLatency = hasLatencyData("contextLoadedLatency");
  const hasInferenceLatency = hasLatencyData("inferenceLatency");
  const hasEnvoyLatency = hasLatencyData("envoyLatency");
  const hasNetworkLatency = hasLatencyData("networkLatency");
  const hasAnyLatencyData = hasEndToEndLatency || hasContextLoadedLatency || hasInferenceLatency || hasEnvoyLatency;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-p-4", children: [
    (hasAnyLatencyData || hasCacheHitRateData()) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4", children: [
      hasEndToEndLatency && /* @__PURE__ */ jsxRuntimeExports.jsx(
        LatencyCard,
        {
          title: "End-to-End Latency",
          latencyData: sessionStats.endToEndLatency,
          latencyType: "endToEnd",
          maxLatencyP90
        }
      ),
      hasContextLoadedLatency && /* @__PURE__ */ jsxRuntimeExports.jsx(
        LatencyCard,
        {
          title: "Context Loading",
          latencyData: sessionStats.contextLoadedLatency,
          latencyType: "contextLoaded",
          maxLatencyP90
        }
      ),
      hasNetworkLatency && /* @__PURE__ */ jsxRuntimeExports.jsx(
        LatencyCard,
        {
          title: "Network Latency",
          latencyData: sessionStats.networkLatency,
          latencyType: "network",
          maxLatencyP90
        }
      ),
      hasInferenceLatency && /* @__PURE__ */ jsxRuntimeExports.jsx(
        LatencyCard,
        {
          title: "Inference Time",
          latencyData: sessionStats.inferenceLatency,
          latencyType: "inference",
          maxLatencyP90
        }
      ),
      hasEnvoyLatency && /* @__PURE__ */ jsxRuntimeExports.jsx(
        LatencyCard,
        {
          title: "Envoy Latency",
          latencyData: sessionStats.envoyLatency,
          latencyType: "envoy",
          maxLatencyP90
        }
      ),
      hasCacheHitRateData() && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-bg-gray-100 tw-dark:tw-bg-gray-800 tw-p-4 tw-rounded tw-border tw-border-gray-200 tw-dark:tw-border-gray-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "tw-text-sm tw-font-medium tw-mb-3", children: "Cache Hit Rate" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-space-y-3", children: [
          sessionStats.meanCacheHitRate.all > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-justify-between tw-items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-text-xs tw-text-gray-500", children: "All Requests" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-text-xs tw-font-medium", children: [
                getCacheHitRateIndicator(
                  sessionStats.meanCacheHitRate.all
                ),
                formatPercent(sessionStats.meanCacheHitRate.all)
              ] })
            ] }),
            getCacheHitRateBar(sessionStats.meanCacheHitRate.all)
          ] }),
          sessionStats.meanCacheHitRate.suggested > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-justify-between tw-items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-text-xs tw-text-gray-500", children: "Suggested Edits" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-text-xs tw-font-medium", children: [
                getCacheHitRateIndicator(
                  sessionStats.meanCacheHitRate.suggested
                ),
                formatPercent(
                  sessionStats.meanCacheHitRate.suggested
                )
              ] })
            ] }),
            getCacheHitRateBar(sessionStats.meanCacheHitRate.suggested)
          ] }),
          sessionStats.meanCacheHitRate.readOrAccepted > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-justify-between tw-items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-text-xs tw-text-gray-500", children: "Read/Accepted Edits" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-text-xs tw-font-medium", children: [
                getCacheHitRateIndicator(
                  sessionStats.meanCacheHitRate.readOrAccepted
                ),
                formatPercent(
                  sessionStats.meanCacheHitRate.readOrAccepted
                )
              ] })
            ] }),
            getCacheHitRateBar(
              sessionStats.meanCacheHitRate.readOrAccepted
            )
          ] })
        ] })
      ] })
    ] }) }),
    statsForLastNRequests && statsForLastNRequests.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        RequestMetricsSummary,
        {
          statsForLastNRequests,
          numberOfRequests: sessionStats.numberOfRequests
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LatencyTrendGraph, { statsForLastNRequests })
    ] }),
    (hasAnyLatencyData || hasCacheHitRateData()) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-mt-8 tw-text-xs tw-text-gray-500 tw-bg-gray-50 tw-dark:tw-bg-gray-900 tw-p-4 tw-rounded tw-border tw-border-gray-200 tw-dark:tw-border-gray-700", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "tw-text-sm tw-font-medium tw-mb-2", children: "About these metrics" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-space-y-2", children: [
        hasAnyLatencyData && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "tw-mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-font-medium", children: "Percentiles:" }),
            " P50 is the median value, P90 means 90% of requests were faster than this value."
          ] }),
          hasEndToEndLatency && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "tw-mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-font-medium", children: "End-to-End:" }),
            " Total time from request initiation to completion."
          ] }),
          hasNetworkLatency && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "tw-mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-font-medium", children: "Network Latency:" }),
            " Time from request start to response completion."
          ] }),
          hasContextLoadedLatency && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "tw-mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-font-medium", children: "Context Loading:" }),
            " Time client spent gathering prompt context."
          ] }),
          hasInferenceLatency && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "tw-mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-font-medium", children: "Inference Time:" }),
            " Time spent by the model generating the response."
          ] }),
          hasEnvoyLatency && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "tw-mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-font-medium", children: "Envoy Latency:" }),
            " TTFT - network latency."
          ] })
        ] }),
        hasCacheHitRateData() && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "tw-mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-font-medium", children: "Cache Hit Rate:" }),
          " Percentage of prompt tokens served from prompt cache instead of requiring a new inference."
        ] })
      ] })
    ] })
  ] });
};

const ALL_PHASES = [
  "All Phases",
  "Start",
  "Context Loaded",
  "Inference",
  "Network",
  "Post Processed",
  "Suggested",
  "Read",
  "Accepted",
  "Rejected",
  "Discarded"
];
const AutoeditDebugPanel = ({ entries, sessionStats, statsForLastNRequests }) => {
  const [phaseFilter, setPhaseFilter] = reactExports.useState("All Phases");
  const [currentView, setCurrentView] = reactExports.useState("requests");
  const filteredEntries = reactExports.useMemo(() => {
    if (phaseFilter === "All Phases") {
      return entries;
    }
    return entries.filter((entry) => {
      const phases = extractPhaseInfo(entry);
      return phases.some((phase) => phase.name === phaseFilter);
    });
  }, [entries, phaseFilter]);
  const { setEntries: setHotStreakEntries, getHotStreakChainForId } = useHotStreakStore();
  reactExports.useEffect(() => {
    setHotStreakEntries(entries);
  }, [entries, setHotStreakEntries]);
  const [selectedEntryId, setSelectedEntryId] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (filteredEntries.length === 0) {
      setSelectedEntryId(null);
      return;
    }
    if (selectedEntryId && filteredEntries.some((entry) => entry.state.requestId === selectedEntryId)) {
      return;
    }
    setSelectedEntryId(filteredEntries[0].state.requestId);
  }, [filteredEntries, selectedEntryId]);
  const selectedEntry = reactExports.useMemo(
    () => filteredEntries.find((entry) => entry.state.requestId === selectedEntryId) || null,
    [filteredEntries, selectedEntryId]
  );
  const handleEntrySelect = reactExports.useCallback((entryId) => {
    setSelectedEntryId(entryId);
  }, []);
  const handlePhaseFilterChange = reactExports.useCallback((event) => {
    setPhaseFilter(event.target.value);
  }, []);
  const toggleView = reactExports.useCallback(() => {
    setCurrentView(currentView === "requests" ? "stats" : "requests");
  }, [currentView]);
  const currentIndex = reactExports.useMemo(() => {
    if (!selectedEntryId) return -1;
    return filteredEntries.findIndex((entry) => entry.state.requestId === selectedEntryId);
  }, [selectedEntryId, filteredEntries]);
  const handlePrevious = reactExports.useCallback(() => {
    if (currentIndex > 0) {
      setSelectedEntryId(filteredEntries[currentIndex - 1].state.requestId);
    }
  }, [currentIndex, filteredEntries]);
  const handleNext = reactExports.useCallback(() => {
    if (currentIndex >= 0 && currentIndex < filteredEntries.length - 1) {
      setSelectedEntryId(filteredEntries[currentIndex + 1].state.requestId);
    }
  }, [currentIndex, filteredEntries]);
  const handleClose = reactExports.useCallback(() => {
    setSelectedEntryId(null);
  }, []);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < filteredEntries.length - 1;
  reactExports.useEffect(() => {
    if (!selectedEntryId) return;
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        if (hasPrevious) handlePrevious();
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        if (hasNext) handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedEntryId, handlePrevious, handleNext, hasPrevious, hasNext]);
  if (entries.length === 0 && currentView === "requests") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, {});
  }
  const headerControls = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-mb-4 tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "tw-rounded tw-bg-gray-200 tw-py-1 tw-px-3 tw-text-sm tw-font-medium hover:tw-bg-gray-300 tw-dark:tw-bg-gray-700 tw-dark:hover:tw-bg-gray-600",
          onClick: toggleView,
          children: currentView === "requests" ? "View Session Stats" : "View Requests"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tw-text-sm tw-font-medium", children: currentView === "requests" ? "Requests" : "Session Statistics" })
    ] }),
    currentView === "requests" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "phase-filter", className: "tw-text-sm tw-font-medium", children: "Filter by phase:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "select",
        {
          id: "phase-filter",
          className: "tw-rounded tw-border tw-border-gray-300 tw-py-1 tw-px-2 tw-text-sm tw-dark:tw-border-gray-700 tw-dark:tw-bg-gray-800",
          value: phaseFilter,
          onChange: handlePhaseFilterChange,
          children: ALL_PHASES.map((phase) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: phase, children: phase }, phase))
        }
      ),
      phaseFilter !== "All Phases" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-text-sm tw-text-gray-500", children: [
        "Showing ",
        filteredEntries.length,
        " of ",
        entries.length,
        " entries"
      ] })
    ] })
  ] });
  if (currentView === "stats") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-h-full tw-overflow-y-auto", children: [
      headerControls,
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SessionStatsPage,
        {
          sessionStats,
          statsForLastNRequests
        }
      )
    ] });
  }
  const entriesList = /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-p-2", children: filteredEntries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-p-4 tw-text-center tw-text-gray-500", children: "No entries match the selected phase filter" }) : filteredEntries.map((entry) => {
    const hotStreakId = "hotStreakId" in entry.state ? entry.state.hotStreakId : null;
    const hotStreakChain = getHotStreakChainForId(hotStreakId);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      AutoeditListItem,
      {
        entry,
        isSelected: entry.state.requestId === selectedEntryId,
        onSelect: handleEntrySelect,
        hotStreakChain
      },
      entry.state.requestId
    );
  }) });
  if (!selectedEntry) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-h-full tw-overflow-y-auto", children: [
      headerControls,
      entriesList
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-flex tw-h-full tw-overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tw-w-2/5 tw-overflow-y-auto tw-border-r tw-border-gray-200 tw-dark:tw-border-gray-700 tw-pr-2", children: [
      headerControls,
      entriesList
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-w-3/5 tw-overflow-y-auto tw-p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      AutoeditDetailView,
      {
        entries,
        entry: selectedEntry,
        onPrevious: handlePrevious,
        onNext: handleNext,
        onClose: handleClose,
        hasPrevious,
        hasNext
      }
    ) })
  ] });
};

function transformRanges(obj) {
  if (obj === null || obj === void 0) {
    return obj;
  }
  if (Array.isArray(obj)) {
    if (obj.length === 2 && typeof obj[0] === "object" && obj[0] !== null && "line" in obj[0] && "character" in obj[0] && typeof obj[1] === "object" && obj[1] !== null && "line" in obj[1] && "character" in obj[1]) {
      return {
        start: { line: obj[0].line, character: obj[0].character },
        end: { line: obj[1].line, character: obj[1].character }
      };
    }
    return obj.map((item) => transformRanges(item));
  }
  if (typeof obj === "object") {
    const result = {};
    for (const key in obj) {
      result[key] = transformRanges(obj[key]);
    }
    return result;
  }
  return obj;
}
function App() {
  const [state, setState] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const handleMessage = (event) => {
      const message = event.data;
      if (message.type === "updateEntries") {
        const processedEntries = message.entries.map((entry) => transformRanges(entry));
        const sortedEntries = [...processedEntries].sort((a, b) => b.updatedAt - a.updatedAt);
        setState({
          entries: sortedEntries,
          sessionStats: message.sessionStats,
          statsForLastNRequests: message.statsForLastNRequests
        });
      }
    };
    window.addEventListener("message", handleMessage);
    vscode.postMessage({ type: "ready" });
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tw-h-full tw-w-full tw-p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    AutoeditDebugPanel,
    {
      entries: state?.entries ?? [],
      sessionStats: state?.sessionStats,
      statsForLastNRequests: state?.statsForLastNRequests ?? []
    }
  ) });
}
const root = createRoot(document.getElementById("root"));
root.render(/* @__PURE__ */ jsxRuntimeExports.jsx(App, {}));
