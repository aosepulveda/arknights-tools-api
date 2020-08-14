/* eslint-disable func-names */
/* eslint-disable import/no-unresolved */
import { check, group, sleep } from 'k6';
import http from 'k6/http';

export const options = {
  max_vus: 100,
  vus: 100,
  stages: [
    { duration: '30s', target: 10 },
    { duration: '2m', target: 100 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    RTT: ['avg<500'],
  },
};

export default function () {
  group('API v1 testing', function () {
    group('get-all-operators-en', function () {
      const res = http.get(
        'http://localhost:4000/v1/operators?showBuffs=true&locale=en',
      );
      check(res, { 'status is 200': (r) => r.status === 200 });
    });

    group('get-all-operators-cn', function () {
      const res = http.get(
        'http://localhost:4000/v1/operators?showBuffs=true&locale=cn',
      );
      check(res, { 'status is 200': (r) => r.status === 200 });
    });

    group('filter-operators-by-tags-en', () => {
      const url = 'http://localhost:4000/v1/tags/recruitment?locale=en';
      const payload = JSON.stringify({
        tags: ['11', '14', '2'],
      });

      const params = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = http.post(url, payload, params);
      check(res, { 'status is 200': (r) => r.status === 200 });
    });

    group('filter-operators-by-tags-cn', () => {
      const url = 'http://localhost:4000/v1/tags/recruitment?locale=cn';
      const payload = JSON.stringify({
        tags: ['11', '14', '2'],
      });

      const params = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = http.post(url, payload, params);
      check(res, { 'status is 200': (r) => r.status === 200 });
    });

    group('get-tags-en', function () {
      const res = http.get('http://localhost:4000/v1/tags?locale=en');
      check(res, { 'status is 200': (r) => r.status === 200 });
    });

    group('get-tags-cn', function () {
      const res = http.get('http://localhost:4000/v1/tags?locale=cn');
      check(res, { 'status is 200': (r) => r.status === 200 });
    });
  });
  sleep(1);
}
