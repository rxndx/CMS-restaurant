import React, {useCallback, useEffect, useState} from 'react';
import { useDrop, useDrag } from 'react-dnd';
import ContentEditable from 'react-contenteditable';
import loadInitialBlocks from "./loadInitialBlocks";

const DraggableBlock = ({ id, children }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'block',
        item: { id },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
            {children}
        </div>
    );
};

const DroppableArea = ({ blocks, moveBlock, editBlockContent }) => {
    const [, drop] = useDrop({
        accept: 'block',
        hover(item, monitor) {
            const dragIndex = blocks.findIndex(block => block.id === item.id);
            const hoverIndex = blocks.findIndex(block => block.id === monitor.getItem().id);

            if (dragIndex !== hoverIndex) {
                moveBlock(dragIndex, hoverIndex);
                item.index = hoverIndex;
            }
        },
    });

    return (
        <div ref={drop}>
            {blocks.map((block, index) => (
                <DraggableBlock key={block.id} id={block.id}>
                    <ContentEditable
                        html={block.content}
                        onChange={(e) => editBlockContent(index, e.target.value)}
                        tagName="div"
                    />
                </DraggableBlock>
            ))}
        </div>
    );
};

const TemplateEditor = ({template: TemplateComponent, saveChanges}) => {
    const [blocks, setBlocks] = useState([]);

    useEffect(() => {
        if (TemplateComponent) {
            const initialBlocks = loadInitialBlocks(TemplateComponent);
            setBlocks(initialBlocks);
        }
    }, [TemplateComponent]);

    const moveBlock = useCallback((dragIndex, hoverIndex) => {
        setBlocks((prevBlocks) => {
            const updatedBlocks = [...prevBlocks];
            const [draggedBlock] = updatedBlocks.splice(dragIndex, 1);
            updatedBlocks.splice(hoverIndex, 0, draggedBlock);
            return updatedBlocks;
        });
    }, []);

    const editBlockContent = (index, content) => {
        const updatedBlocks = blocks.map((block, i) =>
            i === index ? { ...block, content } : block
        );
        setBlocks(updatedBlocks);
    };

    const handleSave = () => {
        saveChanges(blocks);
    };

    return (
        <div>
            <DroppableArea blocks={blocks} moveBlock={moveBlock} editBlockContent={editBlockContent} />
            <button onClick={handleSave}>Save Changes</button>
        </div>
    );
};

export default TemplateEditor;