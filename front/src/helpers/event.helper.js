class Node {
    constructor(interval) {
        this.interval = { ...interval };
        this.left = null;
        this.right = null;
        this.max = interval.end;
        this.interval.intersects = (compare) => {
            return !(this.interval.end <= compare.start || this.interval.start >= compare.end);
        };
    }
}

class IntervalSearchTree {
    constructor(intervals) {
        this.root = null;

        if (intervals && intervals.length > 0) {
            this.addIntervals(intervals);
        }
    }

    add = (interval) => {
        this.root = this.insert(this.root, interval);
    }

    addIntervals = (intervals) => {
        intervals.forEach(interval => this.add(interval));
    }

    searchIntersections = (interval) => {
        const intersections = [];
        this.searchAll(this.root, interval, intersections);
        return intersections;
    }

    searchAll(root, interval, intersections) {
        let foundRoot = false;
        let foundLeft = false;
        let foundRight = false;
        if (!root) {
            return false;
        }

        if (root.interval.intersects(interval)) {
            intersections.push(root);
            foundRoot = true;
        }

        if (root.left && root.left.max >= interval.start) {
            foundLeft = this.searchAll(root.left, interval, intersections);
        }

        if (foundLeft || !root.left || root.left.max <= interval.start) {
            foundRight = this.searchAll(root.right, interval, intersections);
        }

        return foundRoot || foundLeft || foundRight;
    }

    insert(root, interval) {
        if (!root) {
            return new Node(interval);
        }

        if (interval.start < root.interval.start) {
            root.left = this.insert(root.left, interval);
        }

        if (interval.start >= root.interval.start) {
            root.right = this.insert(root.right, interval);
        }

        if (root.max < interval.end) {
            root.max = interval.end;
        }

        return root;
    }
}

const findEventsById = (events, interval) => {
    return events.find(e => e._id === interval._id);
};

const computeWidthDivisor = (events = []) => {
    const intervalSearchTree = new IntervalSearchTree(events);
    events.forEach((e) => {
        e.widthDivisor = 1;
        const intersections = intervalSearchTree.searchIntersections(e);
        let previosPosition = 0;
        intersections.forEach((intersection, intersectionOrder) => {
            const eventIntersected = findEventsById(events, intersection.interval);
            if ('position' in eventIntersected && eventIntersected.position > intersectionOrder && !intersectionOrder) {
                previosPosition = eventIntersected.position;
                eventIntersected.position = previosPosition + intersectionOrder;
                eventIntersected.widthDivisor = intersections.length;                
            } else {
                eventIntersected.position = previosPosition + intersectionOrder;
                eventIntersected.widthDivisor = intersections.length;
            }        
        });
    });

    return events;
};

export default computeWidthDivisor;
