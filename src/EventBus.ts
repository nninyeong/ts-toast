type Toast = {
    message: string;
    duration?: number;
    background?: string;
    showProgress?: boolean;
}

const EventBus = () => {
    const topics = new Map<string, ((data:Toast) => void)[]>();

    const subscribe = (topic:string, listener: (data:Toast)=>void) => {
        if (!topics.has(topic)) {
            topics.set(topic, []);
        }

        topics.get(topic)?.push(listener);

        return () => {
            if(topics.has(topic)) {
                const updatedListeners = topics.get(topic)?.filter((subscribedListener: (data: Toast) => void) => subscribedListener !== listener);

                if(updatedListeners && updatedListeners.length > 0) {
                    topics.set(topic, updatedListeners);
                } else {
                    topics.delete(topic);
                }
            }
        }
    };

    const publish = (topic:string, data:Toast) => {
        if (!topics.has(topic)) return;
        topics.get(topic)?.forEach((listener) => listener(data));
    };

    return { subscribe, publish };
};

export default EventBus();