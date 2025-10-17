


export const experiences = Array.from({length: 100}, (_, i) => (
    {
        name: "project"+i,
        project: 'red' + (Math.floor(100 / i)),
        color: 0xFFFFFF,
        features: ['hello']
    }
))