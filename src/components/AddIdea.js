import { useState } from 'react';
import { Collapse } from 'antd';
import { AddIdeaForm } from './AddIdeaForm';
import {
    doc,
    collection,
    addDoc,
    serverTimestamp,
    writeBatch,
    increment,
} from 'firebase/firestore';
import { db } from '../firestore';

const { Panel } = Collapse;

export function AddIdea({ userId, onIdeaAdded }) {
    const [errorMessage, setErrorMessage] = useState(null);

    const onSubmit = async (values) => {
        const { idea, tags } = values;
        setErrorMessage(null);

        try {
            const tagsMap = tags.reduce((map, tag) => {
                map[tag] = true;
                return map;
            }, {});

            await addDoc(collection(db, 'ideas'), {
                text: idea,
                date: serverTimestamp(),
                author_id: userId,
                tags: tagsMap ?? {},
            });

            // then we add the tag docs
            const batch = writeBatch(db);

            tags.forEach((tag) => {
                batch.set(doc(db, 'tags', tag), {
                    updated_at: serverTimestamp(),
                    count: increment(1),
                });
            });

            await batch.commit();

            onIdeaAdded();

            return true;
        } catch (err) {
            console.log(err);
            setErrorMessage('Unable to save your idea. Please try again.');
            return false;
        }
    };

    const onResetForm = () => {
        setErrorMessage('');
    };

    return (
        <div className="add-idea-container">
            <Collapse defaultActiveKey={['1']} bordered>
                <Panel header="Add Idea" key="1">
                    <AddIdeaForm
                        onSubmit={onSubmit}
                        errorMessage={errorMessage}
                        onResetForm={onResetForm}
                    />
                </Panel>
            </Collapse>
        </div>
    );
}
