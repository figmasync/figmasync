export interface ExportableBytes {
  name: string;
  setting: ExportSettingsImage | ExportSettingsPDF | ExportSettingsSVG;
  bytes: Uint8Array;
}

const capture = async (nodes: PageNode) => {
  const { selection } = nodes;
  if (!selection || selection.length === 0) {
    figma?.notify("Please select at least one node");
    return;
  }
  let exportableBytes: ExportableBytes[] = [];
  for (let node of selection) {
    let { name, exportSettings } = node;
    if (exportSettings.length === 0) {
      exportSettings = [
        {
          format: "PNG",
          suffix: "",
          constraint: { type: "SCALE", value: 1 },
          contentsOnly: true,
        },
      ];
    }
    for (let setting of exportSettings) {
      let defaultSetting = setting;
      const bytes = await node.exportAsync(defaultSetting);
      exportableBytes.push({
        name,
        setting,
        bytes,
      });
    }
  }
  
  figma?.ui?.postMessage({
    type: "capture-nodes-success",
    exportableBytes,
  });
};

export { capture };
