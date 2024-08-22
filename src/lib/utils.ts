export function $$templateElement(selector: string) {
   const $template = document.querySelector('template') as HTMLTemplateElement
   const $templateClone = $template.content.cloneNode(true) as HTMLElement
   const $element = $templateClone.querySelector(selector)

   return $element
}

