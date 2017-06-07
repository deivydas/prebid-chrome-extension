import m from 'mithril';

const block = {
  view: (vnode) => {
    const {attrs} = vnode;
    const buildBlock = (block) => {
      const image = block.image 
            ? m('img', {src: block.image})
            : null;
      const header = block.header 
            ? m('h2', block.header)
            : null;
      const text = block.text 
            ? m('div', {innerHTML: block.text})
            : null;
      const details = header || text
            ? m('.text', [header, text])
            : null;
      return [image,details];
    };

    return m('.blocks', attrs.blocks.map((block) => 
        m('.block', buildBlock(block)) 
    ));
  },
};

export default block;