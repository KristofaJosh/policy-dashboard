import { debounce } from './debounce';
import { vi, describe, test, expect, beforeEach } from 'vitest';

describe('debounce Utility', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  test('given; a function is debounced; should only execute once after the delay', () => {
    // Arrange
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 500);
    
    // Act
    debouncedFn();
    debouncedFn();
    debouncedFn();
    
    // Assert - function should not have been called yet
    expect(mockFn).not.toHaveBeenCalled();
    
    // Act - advance timer
    vi.advanceTimersByTime(500);
    
    // Assert - function should have been called once
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test('given; a debounced function is called multiple times with delays between calls; should reset the timer', () => {
    // Arrange
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 500);
    
    // Act
    debouncedFn();
    
    // Advance timer partially
    vi.advanceTimersByTime(300);
    
    // Call again before the first call executes
    debouncedFn();
    
    // Advance timer partially again
    vi.advanceTimersByTime(300);
    
    // Assert - function should not have been called yet
    expect(mockFn).not.toHaveBeenCalled();
    
    // Advance timer to complete the delay
    vi.advanceTimersByTime(200);
    
    // Assert - function should have been called once
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test('given; a debounced function is called with arguments; should pass the arguments to the original function', () => {
    // Arrange
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 500);
    
    // Act
    debouncedFn('test', 123);
    
    // Advance timer
    vi.advanceTimersByTime(500);
    
    // Assert
    expect(mockFn).toHaveBeenCalledWith('test', 123);
  });
});