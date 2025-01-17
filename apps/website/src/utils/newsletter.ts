export const smoothScrollTo = (sectionId: string, padding = 0) => {
  const element = document.getElementById(sectionId);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.scrollY - padding;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
};
