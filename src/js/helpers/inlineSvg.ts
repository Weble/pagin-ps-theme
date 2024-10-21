function inlineSvg(image: HTMLImageElement, callback?: () => any) {
  return fetch(image.src)
    .then((res) => res.text())
    .then((data) => {
      const parser = new DOMParser();
      let svg =
        parser.parseFromString(data, "image/svg+xml").querySelector("svg") ??
        document.createElement("svg");

      if (image.id) {
        svg.id = image.id;
      }
      if (image.className) {
        image.classList.forEach((className) => {
          svg.classList.add(className);
        });
      }

      if (!image.parentNode) {
        return;
      }

      image.parentNode.replaceChild(svg, image);

      return svg;
    })
    .then(callback)
    .catch((error) => console.error(error));
}

function initInlineSvgAttribute(
  attribute: string,
  callback?: (svg?: HTMLImageElement) => any
) {
  document.querySelectorAll(`[${attribute}]`).forEach((element) => {
    if (element.tagName !== "IMG") {
      return;
    }

    inlineSvg(element as HTMLImageElement, callback);
  });
}

export { inlineSvg, initInlineSvgAttribute };
