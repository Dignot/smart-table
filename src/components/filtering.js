
export function initFiltering(elements) {
  const updateIndexes = (els, indexes) => {
    Object.keys(indexes).forEach((elementName) => {
      const el = els[elementName];
      if (!el) return;

      el.replaceChildren();

      const options = Object.values(indexes[elementName]).map((name) => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        return option;
      });

      el.append(...options);
    });
  };

  const applyFiltering = (query, state, action) => {
    if (action && action.name === 'clear') {
      const parent = action.closest('.filter-wrapper');
      if (parent) {
        const input = parent.querySelector('input, select');
        if (input) {
          input.value = '';
          const field = action.dataset.field;
          if (field && field in state) {
            state[field] = '';
          }
        }
      }
    }

    const filter = {};
    Object.keys(elements).forEach((key) => {
      const el = elements[key];
      if (!el) return;
      if (['INPUT', 'SELECT'].includes(el.tagName) && el.value) {
        filter[`filter[${el.name}]`] = el.value;
      }
    });

    return Object.keys(filter).length ? Object.assign({}, query, filter) : query;
  };

  return {
    updateIndexes,
    applyFiltering,
  };
}
