import { mockCreateProfileDTO } from "@/modules/professional-profiles/profiles/mocks";

export const mockElasticSearchResponse = () => ({
    hits: {
        hits: [{
            _source: mockCreateProfileDTO(),
            _score: 1,
            _index: 'profile',
            _id: '1',
        }],
        total: {
            value: 1,
            relation: 'eq'
        }
    },
    timed_out: false,
    took: 1,
    _shards: {
        failed: 0,
        successful: 1,
        total: 1,
        failures: [],
        skipped: 0
    }
})